package br.ufc.crateus.sgb.controller;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.interfaces.ICrud;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Inscricao;
import br.ufc.crateus.sgb.model.InscricaoValidacao;
import br.ufc.crateus.sgb.model.Notificacao;
import br.ufc.crateus.sgb.model.Processo;
import br.ufc.crateus.sgb.model.dto.InscricaoDTO;
import br.ufc.crateus.sgb.model.enums.StatusEnum;
import br.ufc.crateus.sgb.repository.InscricaoRepository;
import br.ufc.crateus.sgb.repository.InscricaoValidacaoRepository;
import br.ufc.crateus.sgb.repository.NotificacaoRepository;
import br.ufc.crateus.sgb.repository.ProcessoRepository;
import br.ufc.crateus.sgb.repository.RecursoRepository;
import br.ufc.crateus.sgb.service.InscricaoService;
import br.ufc.crateus.sgb.service.MailService;

/**
 * Controlador Rest para manejar API referentes a entidade Inscricao 
 * @author Leonardo Dutra
 * @see ICrud 
 * @see Inscricao
 * @see InscricaoRepository
 * @see InscricaoService
 */
@RequestMapping("/api/inscricao")
@RestController
public class InscricaoController implements ICrud<Inscricao> {

	@Autowired
	private InscricaoRepository inscricaoRepository;
	
	@Autowired
	private ProcessoRepository processoRepository;

	@Autowired
	private RecursoRepository recursoRepository;
	
	@Autowired
	private InscricaoValidacaoRepository iValidaRepository;
	
	@Autowired
	private InscricaoService inscricaoService;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private NotificacaoRepository notificacaoRepository;
	
	@PreAuthorize("hasAuthority('add_inscricao')")
	@PostMapping
	@Override
	public ResponseEntity<Inscricao> add(@RequestBody Inscricao inscricao) {
		inscricaoRepository.save(inscricao);
		return new ResponseEntity<Inscricao>(inscricao,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_inscricao')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Inscricao> update(@RequestBody Inscricao inscricao, @PathVariable long id) {
		if(inscricaoService.isExist(id)) {
			inscricao.setId(id);
			inscricaoRepository.save(inscricao);
			if(inscricao.getSituacao() == StatusEnum.INSCRITO) {
				this.notificarMail(inscricao.getId());
			}
			return new ResponseEntity<Inscricao>(inscricao,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Inscricao>(inscricao,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_inscricao')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(inscricaoService.isExist(id)) {
			inscricaoRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping
	@Override
	public ResponseEntity<List<Inscricao>> getAll() {
		List<Inscricao> lista = inscricaoRepository.findAll();
		return new ResponseEntity<List<Inscricao>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Inscricao> getById(@PathVariable long id) {
		Inscricao inscricao = inscricaoRepository.findById(id);
		return new ResponseEntity<Inscricao>(inscricao,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping("/search")
	public ResponseEntity<Inscricao> getByInscricaoAndAluno(@RequestParam Long matricula, @RequestParam long idInscricao){
		Inscricao inscricao = inscricaoRepository.findByIdAndAlunoSiape(idInscricao, matricula);
		return new ResponseEntity<Inscricao>(inscricao, HttpStatus.OK);
		
	}
	
	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping("/searchByProcesso")
	public ResponseEntity<Inscricao> getByProcessoAndAluno(@RequestParam long processo, @RequestParam Long matricula){
		Inscricao inscricao = inscricaoRepository.findByProcessoIdAndAlunoSiape(processo, matricula);
		return new ResponseEntity<Inscricao>(inscricao, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping("/custom")
	public ResponseEntity<List<InscricaoDTO>> getCustom(@RequestParam long id){
		List<Inscricao> inscricoes = inscricaoRepository.findCustomInscricoes(id);
		List<InscricaoDTO> inscricoesCustom = new ArrayList<InscricaoDTO>();
		
		int count = 0;
		for(Inscricao i : inscricoes) {
			boolean existRecurso = this.recursoRepository.existsByInscricaoId(i.getId());
			boolean existInscricao = false;
			boolean iValid = false;
			
			if(i != null)
				existInscricao = true;
			
			Processo p = i.getProcesso();
			Aluno a = i.getAluno();
			InscricaoValidacao v = this.iValidaRepository.findByInscricaoId(i.getId());
			
			
			if(v != null) {
				if(v.isDadosPessoaisCompleto() && v.isDadosContatosLogradouroCompleto() && v.isDadosAcadCompleto()
						&& v.isDadosMoradiaTransporteCompleto() && v.isDadosOutrosAuxiliosCompleto()
						&& v.isDadosSaudeDeficienciaCompleto() && v.isDadosSocioEconCompleto()) {
					iValid = true;
				}
			}
			
			InscricaoDTO inscricaoDTO = new InscricaoDTO(a.getId(), a.getNomeCompleto(), a.getSiape(), 
					a.getCpf(), a.getCursoAtual(), existInscricao, existRecurso, iValid, p.getId(), 
					i.getId(), (i.getSituacao() == null ? "SEM_STATUS" : i.getSituacao().name()), 
					(i.getSituacaoFinal() == null ? "SEM_STATUS" : i.getSituacaoFinal().name()), ++count);
			
			inscricoesCustom.add(inscricaoDTO);
		}
		
		return new ResponseEntity<List<InscricaoDTO>>(inscricoesCustom, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping("/processo")
	public ResponseEntity<List<Inscricao>> getByProcesso(@RequestParam long id){
		List<Inscricao> inscricoes = inscricaoRepository.findByProcessoId(id);
		return new ResponseEntity<List<Inscricao>>(inscricoes, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping("/aluno")
	public ResponseEntity<List<Inscricao>> getInscricoesByProcessos(@RequestParam long id){
		List<Processo> processosAtivos = this.processoRepository.findByUnificado();
		
		List<Inscricao> inscricoesEncontradas = new ArrayList<Inscricao>();
		for(Processo p : processosAtivos) {
			Inscricao i = inscricaoRepository.findByAlunoIdAndProcessoId(id, p.getId());
			if(i != null) {
				inscricoesEncontradas.add(i);
			}
		}
		
		return new ResponseEntity<List<Inscricao>>(inscricoesEncontradas, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping("/searchByAluno")
	public ResponseEntity<List<Inscricao>> getByAlunoId(@RequestParam long aluno){
		List<StatusEnum> situacoes = new ArrayList<>();
		situacoes.add(StatusEnum.INSCRITO);
		situacoes.add(StatusEnum.INDEFERIDO);
		situacoes.add(StatusEnum.DEFERIDO);
		List<Inscricao> inscricoes = inscricaoRepository.findAlunoSituacao(aluno, situacoes);
		return new ResponseEntity<List<Inscricao>>(inscricoes, HttpStatus.OK);
	}
	
	
	@PreAuthorize("hasAuthority('view_inscricao')")
	@GetMapping("/abble")
	public ResponseEntity<Boolean> isAbbleInscricao(@RequestParam Long siape, @RequestParam Integer validade){
		
		// validade desses critérios de validação, ou seja, se o número for maior que 1, então é um ID de um processso, que indica que os 
		// critérios vão valer apenas para aquele processo
		// 0 indica que essa verificação não está valendo, para nenhum processo
		// 1 indica que essa verificação está valendo

		Boolean isAbble = false;
		
		if(siape == null || validade == null) {
			return new ResponseEntity<Boolean>(isAbble, HttpStatus.BAD_REQUEST);
		}
			
		if(validade == 0) {
			isAbble = true;
			return new ResponseEntity<Boolean>(isAbble, HttpStatus.OK);
		}else if(siape <= 0) {
			return new ResponseEntity<Boolean>(isAbble, HttpStatus.BAD_REQUEST);
		}else {

			List<Integer> criterioAnos = new ArrayList<Integer>();
			criterioAnos.add(2020);
			
			List<Long> criterioAuxilios = new ArrayList<Long>();
			criterioAuxilios.add(1L); // 1 para auxílio moradia
			
			List<Long> processos = new ArrayList<Long>();
			processos = this.processoRepository.findByAnoAndAuxilio(criterioAnos, criterioAuxilios);
			 
			List<Long> resultadosCriterios = inscricaoRepository.abbleQuery(processos);
			
			for(Long info : resultadosCriterios) {
				if (siape.equals(info)) {
					isAbble = true;
					return new ResponseEntity<Boolean>(isAbble, HttpStatus.OK);
				}
			}
		}
		
		return new ResponseEntity<Boolean>(isAbble, HttpStatus.OK);
	}
	

	public ResponseEntity<Inscricao> notificarMail(@RequestParam long inscricao) {
		Inscricao i = inscricaoRepository.findById(inscricao);
		Aluno a = i.getAluno();
		
		try {
			mailService.sendConfirmationEmail(a, i);
			if(notificacaoRepository.findByInscricaoRefAndStatusRefNotificacao(i, StatusEnum.INSCRITO).isEmpty()) {
				Notificacao n = new Notificacao();
				n.setDataRegistro(LocalDate.now());
				n.setDescricao("Emissão do Comprovante de Inscrição via E-mail ao aluno!");
				n.setEnvio(true);
				n.setInscricaoRef(i);
				n.setStatusRefNotificacao(StatusEnum.INSCRITO);
				
				notificacaoRepository.save(n);
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return new ResponseEntity<Inscricao>(i,HttpStatus.OK);
	}
	
}
