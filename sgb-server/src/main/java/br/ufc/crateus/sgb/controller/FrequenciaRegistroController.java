package br.ufc.crateus.sgb.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

import br.ufc.crateus.sgb.exception.ApiError;
import br.ufc.crateus.sgb.interfaces.ICrud;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.FrequenciaRegistro;
import br.ufc.crateus.sgb.model.Horario;
import br.ufc.crateus.sgb.model.Projeto;
import br.ufc.crateus.sgb.model.enums.FrequenciaEnum;
import br.ufc.crateus.sgb.model.page.FrequenciaRegistroPage;
import br.ufc.crateus.sgb.model.page.criteria.FrequenciaRegistroCriteria;
import br.ufc.crateus.sgb.repository.AlunoRepository;
import br.ufc.crateus.sgb.repository.FrequenciaRegistroRepository;
import br.ufc.crateus.sgb.repository.ProjetoRepository;
import br.ufc.crateus.sgb.service.FrequenciaRegistroService;
import br.ufc.crateus.sgb.utils.frequencia.PeriodoFrequenciaAluno;
import br.ufc.crateus.sgb.utils.frequencia.PeriodoFrequenciaProjeto;

/**
 * Controlador Rest para manejar API referentes a entidade FrequenciaRegistro 
 * @author Leonardo Dutra
 * @see ICrud
 * @see FrequenciaRegistro
 * @see FrequenciaRegistroRepository
 * @see FrequenciaRegistroService
 */
@RequestMapping("/api/frequencia/registro")
@RestController
public class FrequenciaRegistroController implements ICrud<FrequenciaRegistro>{

	@Autowired
	private FrequenciaRegistroRepository frequenciaRegistroRepository;
	
	@Autowired
	private FrequenciaRegistroService frequenciaRegistroService;
	
	@Autowired
	private AlunoRepository alunoRepository;
	
	@Autowired
	private ProjetoRepository projetoRepository;
	
	@PreAuthorize("hasAuthority('add_frequencia_registro')")
	@PostMapping
	@Override
	public ResponseEntity<?> add(@RequestBody FrequenciaRegistro frequenciaRegistro) {
		List<Horario> horariosTemp = new ArrayList<Horario>();
		
		if(frequenciaRegistro.getHorarios().size() > 0) {
			for(Horario h : frequenciaRegistro.getHorarios()) {
				h.setEntrada(ajusteHorario(h.getEntrada()));
				h.setSaida(ajusteHorario(h.getSaida()));

				if(h.getEntrada() != null)
					frequenciaRegistro.setAssinaturaAlunoEntrada(true);
				
				if(h.getSaida() != null)
					frequenciaRegistro.setAssinaturaAlunoSaida(true);
				
				
				if(!isValidDataHoraHoje(h.getEntrada(), h.getSaida(), frequenciaRegistro.getDataReferencia())) {
					ApiError erro = new ApiError(400, "Erro ao incluir novo registro de frequência!", 
							"Horário de entrada ou saída informado(s) para o dia de hoje é(são) futuro(s) ao horário atual! Realize as correções e tente novamente...");
					return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);
				}
				
				if(!isValidIntervaloTimes(h.getEntrada(), h.getSaida())) {
					ApiError erro = new ApiError(400, "Erro ao incluir novo registro de frequência!", 
							"Horário de entrada informado é superior ao horário de saída! Realize as correções e tente novamente...");
					return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);
				}
				
				Long totalMinutos = getMinutosIntervalo(h.getEntrada(), h.getSaida());
				
				h.setTotalMinutos(totalMinutos);
				
				horariosTemp.add(h);

			}
			Collections.sort(horariosTemp);
			frequenciaRegistro.setHorarios(horariosTemp);
		}

		
		if(frequenciaRegistro.isAssinaturaAlunoEntrada() && frequenciaRegistro.isAssinaturaAlunoSaida()) {
			frequenciaRegistro.setStatus(FrequenciaEnum.ASSINADO);
		}else{
			frequenciaRegistro.setStatus(FrequenciaEnum.ANDAMENTO);
		}

		
		if(this.frequenciaRegistroService.isExist(frequenciaRegistro)) {
			ApiError erro = new ApiError(400, "Erro ao incluir novo registro de frequência!", 
					"O registro de frequência informado já existe... Reveja os parâmetros informados...");
			return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);
		}else {
			frequenciaRegistro.setCreated(new Date());
			frequenciaRegistro.setUpdated(new Date());
			frequenciaRegistroRepository.save(frequenciaRegistro);
			return new ResponseEntity<FrequenciaRegistro>(frequenciaRegistro,HttpStatus.OK);
		}

	}
	
	LocalTime ajusteHorario(LocalTime horario) {
		return horario.truncatedTo(ChronoUnit.MINUTES);
	}

	boolean isValidIntervaloTimes(LocalTime entrada, LocalTime saida){
		return !entrada.isAfter(saida);
	}
	
	boolean isValidDataHoraHoje(LocalTime entrada, LocalTime saida, LocalDate dataReferencia) {
		return !((entrada.isAfter(LocalTime.now()) || saida.isAfter(LocalTime.now())) && dataReferencia.isEqual(LocalDate.now()));
	}
	
	long getMinutosIntervalo(LocalTime entrada, LocalTime saida) {
		return ChronoUnit.MINUTES.between(entrada, saida);
	}
	
	long totalMinutosRegistroDiario(List<Horario> horariosDiario) {
		long total = 0;
		
		for(Horario h: horariosDiario) {
			LocalTime entrada = h.getEntrada();
			LocalTime saida = h.getSaida();
			
			
			if(isValidIntervaloTimes(entrada, saida))
				total += getMinutosIntervalo(entrada, saida);
		}
		return total;
	}
	
	boolean isValidDataHora(LocalTime entrada, LocalTime saida) {
		return !((saida == entrada) || saida.isBefore(entrada));
	}
	
	boolean checkHorariosConflitos(List<Horario> horariosExistentes, List<Horario> novoHorario) {
		boolean horariosConflito = false;
		
		for(Horario h: horariosExistentes) {
			for(Horario hNovo: novoHorario) {
				if(h.getEntrada() == hNovo.getEntrada() || h.getSaida() == hNovo.getSaida())
					horariosConflito = true;
			}
		}
		return horariosConflito;
	}

	@PreAuthorize("hasAuthority('delete_frequencia_registro')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(frequenciaRegistroService.isExist(id)) {
			frequenciaRegistroRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping
	@Override
	public ResponseEntity<List<FrequenciaRegistro>> getAll() {
		List<FrequenciaRegistro> listaInicial = frequenciaRegistroRepository.findAll();
		List<FrequenciaRegistro> listaHorariosSort = frequenciaRegistroService.sortHorariosAllFrequencias(listaInicial);
		return new ResponseEntity<List<FrequenciaRegistro>>(listaHorariosSort,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<FrequenciaRegistro> getById(@PathVariable long id) {
		FrequenciaRegistro frequenciaRegistro = frequenciaRegistroRepository.findById(id);
		frequenciaRegistro.setHorarios(frequenciaRegistroService.sortHorarios(frequenciaRegistro.getHorarios()));
		return new ResponseEntity<FrequenciaRegistro>(frequenciaRegistro,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/updateAll")
	public ResponseEntity<?> updateAll(@RequestParam Long idProjeto, @RequestParam Long idAluno,
			@RequestParam Integer mesRef, @RequestParam Integer anoRef){
		if(frequenciaRegistroService.assinarTodosRegistrosMensalPorAluno(idAluno, idProjeto, mesRef, anoRef)) {
					return new ResponseEntity<Boolean>(true,HttpStatus.OK);
		}else {
			ApiError erro = new ApiError(400, "Erro ao atualizar registros de frequência em Lote!", 
					"Algum erro ocorrido na atualização em lote...");
			return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);
		}
	}

	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/hasRegistroNotAssignedResponsavel")
	public ResponseEntity<?> hasRegistrosNotAssignedByResponsavel(@RequestParam Long idProjeto, @RequestParam Long idAluno,
			@RequestParam Integer mesRef, @RequestParam Integer anoRef){
		if(frequenciaRegistroService.hasRegistrosMensalPorAlunoNotAssignedByResponsavel(idAluno, idProjeto, mesRef, anoRef))
			return new ResponseEntity<Boolean>(true,HttpStatus.OK);
		else
			return new ResponseEntity<Boolean>(false,HttpStatus.OK);
	}
	
	@Override
	@PutMapping(value="{id}")
	public ResponseEntity<?> update(@RequestBody FrequenciaRegistro frequenciaRegistro, 
			@PathVariable long id) {
		
		if(frequenciaRegistroService.isExist(id)) { 
			
			if(!frequenciaRegistro.isAssinaturaResponsavel()) {
		
				List<Horario> horariosExistentes = this.frequenciaRegistroRepository.findById(id).getHorarios();
			
				if(frequenciaRegistro.isAssinaturaResponsavel())
					frequenciaRegistro.setDataHoraAssinaturaResponsavel(new Date());
	
				if(horariosExistentes.size() < 1)
					horariosExistentes = new ArrayList<Horario>();
				
				if(frequenciaRegistro.getHorarios().size() > 0) {
					for(Horario h : frequenciaRegistro.getHorarios()) {
						
  					h.setEntrada(ajusteHorario(h.getEntrada()));
						h.setSaida(ajusteHorario(h.getSaida()));
            
						if(!isValidDataHora(h.getEntrada(), h.getSaida())) {
							ApiError erro = new ApiError(400, "Erro ao atualizar registro de frequência!", 
									"Horário de entrada informado é superior ao horário de saída! Realize as correções e tente novamente...");
							return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);
						}
            
						if(h.getEntrada() != null) {
							frequenciaRegistro.setAssinaturaAlunoEntrada(true);
						}else {
							ApiError erro = new ApiError(400, "Erro ao atualizar registro de frequência!", 
									"Horário de entrada informado está nulo ou ausente...");
							return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);							
						}
						
						if(h.getSaida() != null) {
							frequenciaRegistro.setAssinaturaAlunoSaida(true);
						}else {
							ApiError erro = new ApiError(400, "Erro ao atualizar registro de frequência!", 
									"Horário de saída informado está nulo ou ausente...");
							return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);
						}

						if(!isValidDataHoraHoje(h.getEntrada(), h.getSaida(), frequenciaRegistro.getDataReferencia())) {
							ApiError erro = new ApiError(400, "Erro ao atualizar registro de frequência!", 
									"Horário de entrada ou saída informado(s) para o dia de hoje é(são) futuro(s) ao horário atual! Realize as correções e tente novamente...");
							return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);
						}
						
						if(!isValidIntervaloTimes(h.getEntrada(), h.getSaida())) {
							ApiError erro = new ApiError(400, "Erro ao atualizar registro de frequência!", 
									"Horário de entrada informado é superior ao horário de saída! Realize as correções e tente novamente...");
							return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);
						}
						
						if(!frequenciaRegistro.isAssinaturaResponsavel()) {
							if(checkHorariosConflitos(horariosExistentes, frequenciaRegistro.getHorarios())) {
								ApiError erro = new ApiError(400, "Erro ao atualizar registro de frequência!", 
										"Horários de entrada/saída em conflito (já existente para a data informada)...");
								return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);
							}						
						}
	
						horariosExistentes.add(h);
						
						Long totalMinutosRegistro = getMinutosIntervalo(h.getEntrada(), h.getSaida());
						
						h.setTotalMinutos(totalMinutosRegistro);
					}
					
					Long totalMinutos = totalMinutosRegistroDiario(horariosExistentes);
					
					frequenciaRegistro.setTotalMinutos(totalMinutos.intValue());
					
					frequenciaRegistro.setHorarios(horariosExistentes);	
				}
				
				frequenciaRegistro.setId(id);
				frequenciaRegistro.setUpdated(new Date());
				frequenciaRegistroRepository.save(frequenciaRegistro);
				frequenciaRegistro.setHorarios(frequenciaRegistroService.sortHorarios(frequenciaRegistro.getHorarios()));
				return new ResponseEntity<FrequenciaRegistro>(frequenciaRegistro,HttpStatus.OK);
			
			}else {
				frequenciaRegistro.setId(id);
				frequenciaRegistro.setUpdated(new Date());
				frequenciaRegistroRepository.save(frequenciaRegistro);
				frequenciaRegistro.setHorarios(frequenciaRegistroService.sortHorarios(frequenciaRegistro.getHorarios()));
				return new ResponseEntity<FrequenciaRegistro>(frequenciaRegistro,HttpStatus.OK);
			}
		}
		
		return new ResponseEntity<FrequenciaRegistro>(frequenciaRegistro,HttpStatus.NOT_FOUND);
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/aluno")
	public ResponseEntity<Collection<FrequenciaRegistro>> getRegistroByAluno(@RequestParam Long id) {
		List<FrequenciaRegistro> frequenciasFind = frequenciaRegistroRepository.findByProjetoAlunoId(id);
		List<FrequenciaRegistro> listaHorariosSort = frequenciaRegistroService.sortHorariosAllFrequencias(frequenciasFind);
		return new ResponseEntity<Collection<FrequenciaRegistro>>(listaHorariosSort,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/projeto")
	public ResponseEntity<Collection<FrequenciaRegistro>> getRegistroByProjeto(@RequestParam Long id) {
		List<FrequenciaRegistro> frequenciasFind = frequenciaRegistroRepository.findByProjetoId(id);
		List<FrequenciaRegistro> listaHorariosSort = frequenciaRegistroService.sortHorariosAllFrequencias(frequenciasFind);
		return new ResponseEntity<Collection<FrequenciaRegistro>>(listaHorariosSort,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/frequencia")
	public ResponseEntity<List<FrequenciaRegistro>> getRegistroByDataRef(@RequestParam String dataRef) {
		List<FrequenciaRegistro> frequenciasFind = frequenciaRegistroRepository
				.findByPeriodoRef(dataRef);
		if(frequenciasFind.size() > 0) {
			List<FrequenciaRegistro> listaHorariosSort = frequenciaRegistroService.sortHorariosAllFrequencias(frequenciasFind);
			return new ResponseEntity<List<FrequenciaRegistro>>(listaHorariosSort,HttpStatus.OK);	
		}else {
			return new ResponseEntity<List<FrequenciaRegistro>>(new ArrayList<FrequenciaRegistro>(),HttpStatus.NOT_FOUND);
		}
		
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/frequenciasPeriodo")
	public ResponseEntity<Page<FrequenciaRegistro>> getRegistrosPeriodo(
			FrequenciaRegistroPage frequenciaRegistroPage,
			FrequenciaRegistroCriteria frequenciaRegistroCriteria,
			@RequestParam(required = false) Long idProjeto, @RequestParam(required = false) Long alunoId, 
			@RequestParam(required = false) Integer mesRef, @RequestParam(required = false) Integer anoRef,
			@RequestParam(required = false) Integer numPage) {
		
		if(numPage != null)
			frequenciaRegistroPage.setPageNumber(numPage);
		
		Optional<Aluno> aluno = this.alunoRepository.findById(alunoId);
		Optional<Projeto> projeto = this.projetoRepository.findById(idProjeto);

		frequenciaRegistroCriteria.setAluno(aluno.get());
		frequenciaRegistroCriteria.setProjeto(projeto.get());
		frequenciaRegistroCriteria.setMesRef(mesRef);
		frequenciaRegistroCriteria.setAnoRef(anoRef);
		
		Page<FrequenciaRegistro> frequenciasFindPage = this.frequenciaRegistroService
					.getFrequenciaRegistrosPage(frequenciaRegistroPage, frequenciaRegistroCriteria);
		
		return new ResponseEntity<Page<FrequenciaRegistro>>(frequenciasFindPage,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/frequencias")
	public ResponseEntity<Collection<FrequenciaRegistro>> getRegistros(@RequestParam Long idProjeto, @RequestParam Long alunoId) {
		List<FrequenciaRegistro> frequenciasFind = frequenciaRegistroRepository
				.findByProjetoIdAndAlunoId(idProjeto, alunoId);
		List<FrequenciaRegistro> listaHorariosSort = frequenciaRegistroService.sortHorariosAllFrequencias(frequenciasFind);
		return new ResponseEntity<Collection<FrequenciaRegistro>>(listaHorariosSort,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/exists")
	public ResponseEntity<Boolean> existsByAlunoAndFrequencia(@RequestParam Long projetoId, @RequestParam Long alunoId) {
		List<FrequenciaRegistro> frequenciasFind = frequenciaRegistroRepository
				.findByProjetoIdAndAlunoId(projetoId, alunoId);
		
		boolean exists = false;
		if(frequenciasFind.size() > 0)
			exists= true;
		
		return new ResponseEntity<Boolean>(exists,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/periodos")
	public ResponseEntity<Collection<PeriodoFrequenciaAluno>> getPeriodosByProjetoAndAluno(@RequestParam Long projetoId, 
			@RequestParam Long alunoId) {
		Map<String, PeriodoFrequenciaAluno> periodosProjetoAluno = frequenciaRegistroService.getPeriodosProjetoAluno(alunoId, projetoId);
		return new ResponseEntity<Collection<PeriodoFrequenciaAluno>>(periodosProjetoAluno.values(),HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/periodosProjeto")
	public ResponseEntity<Collection<PeriodoFrequenciaProjeto>> getPeriodosByProjeto(@RequestParam Long projetoId) {
		List<PeriodoFrequenciaProjeto> listSort = new ArrayList<>();
		listSort = frequenciaRegistroService.periodosAgrupadosByProjeto(projetoId);
		return new ResponseEntity<Collection<PeriodoFrequenciaProjeto>>(listSort,HttpStatus.OK);
	}
	
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/periodosAllProjetos")
	public ResponseEntity<Collection<PeriodoFrequenciaProjeto>> getPeriodosAllProjeto() {
		List<PeriodoFrequenciaProjeto> listSort = new ArrayList<>();
		listSort = frequenciaRegistroService.periodosAgrupados();
		return new ResponseEntity<Collection<PeriodoFrequenciaProjeto>>(listSort,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/diarioAluno")
	public ResponseEntity<FrequenciaRegistro> getRegistroDiariosAluno(
			@RequestParam Long projetoId, @RequestParam Long alunoId, @RequestParam Integer diaRef,
			@RequestParam Integer mesRef, @RequestParam Integer anoRef) {
		
		Optional<FrequenciaRegistro> frequenciaRegistroHoje = frequenciaRegistroRepository
				.findByProjetoIdAndAlunoIdAndDiaRefAndMesRefAndAnoRef(projetoId, alunoId, diaRef, mesRef, anoRef);
		
		if(frequenciaRegistroHoje.isPresent()) {
			FrequenciaRegistro registroHoje = frequenciaRegistroHoje.get();
			registroHoje.setHorarios(frequenciaRegistroService.sortHorarios(registroHoje.getHorarios()));
			return new ResponseEntity<FrequenciaRegistro>(registroHoje,HttpStatus.OK);	
		}

		return new ResponseEntity<FrequenciaRegistro>(new FrequenciaRegistro(),HttpStatus.OK);
		
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/mesAluno")
	public ResponseEntity<Page<FrequenciaRegistro>> getRegistroMensaisAluno(
			FrequenciaRegistroPage frequenciaRegistroPage,
			FrequenciaRegistroCriteria frequenciaRegistroCriteria,
			@RequestParam(required = false) Long projetoId, @RequestParam(required = false) Long alunoId, 
			@RequestParam(required = false) Integer mesRef, @RequestParam(required = false) Integer anoRef,
			@RequestParam(required = false) Integer numPage) {
		
		if(numPage != null)
			frequenciaRegistroPage.setPageNumber(numPage);

		Optional<Aluno> aluno = this.alunoRepository.findById(alunoId);
		Optional<Projeto> projeto = this.projetoRepository.findById(projetoId);

		frequenciaRegistroCriteria.setAluno(aluno.get());
		frequenciaRegistroCriteria.setProjeto(projeto.get());
		frequenciaRegistroCriteria.setMesRef(mesRef);
		frequenciaRegistroCriteria.setAnoRef(anoRef);
		
		Page<FrequenciaRegistro> frequenciasFindPage = this.frequenciaRegistroService
					.getFrequenciaRegistrosPage(frequenciaRegistroPage, frequenciaRegistroCriteria);
		return new ResponseEntity<Page<FrequenciaRegistro>>(frequenciasFindPage,HttpStatus.OK);	

	}

}
