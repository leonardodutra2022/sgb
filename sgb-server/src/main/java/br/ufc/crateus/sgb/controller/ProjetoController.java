package br.ufc.crateus.sgb.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import br.ufc.crateus.sgb.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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

import br.ufc.crateus.sgb.exception.RegisterNotFoundException;
import br.ufc.crateus.sgb.interfaces.ICrud;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Projeto;
import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.repository.AlunoRepository;
import br.ufc.crateus.sgb.repository.ProjetoRepository;
import br.ufc.crateus.sgb.repository.UsuarioRepository;
import br.ufc.crateus.sgb.repository.custom.ProjetoCustomRepository;
import br.ufc.crateus.sgb.service.ProjetoService;


/**
 * Controlador Rest para manejar API referentes a entidade Projeto 
 * @author Leonardo Dutra
 * @see ICrud
 * @see Projeto
 * @see ProjetoRepository
 * @see ProjetoService
 */
@RequestMapping("/api/projeto")
@RestController
public class ProjetoController implements ICrud<Projeto>{
	
	@Autowired
	private ProjetoRepository projetoRepository;
	
	@Autowired
	private ProjetoService projetoService;
	
	@Autowired
	private AlunoRepository alunoRepository;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private ProjetoCustomRepository projetoCustomRepository;

	@Autowired
	private MailService mailService;


	@Override
	public ResponseEntity<Projeto> add(@RequestBody Projeto projeto) {
		projetoRepository.save(projeto);
		return new ResponseEntity<Projeto>(projeto,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('add_projeto')")
	@PostMapping
	public ResponseEntity<Projeto> addMultiple(@RequestBody Projeto projeto, @RequestParam(required = false) List<Long> alunosIds){
		
		List<Aluno> alunosTemp = new ArrayList<Aluno>();
		
		for(Long i : alunosIds) {
			Optional<Aluno> a = Optional.ofNullable(this.alunoRepository
					.findById(i).orElseThrow(
							() -> new RegisterNotFoundException(i)));
			if(a.isPresent()) {
				alunosTemp.add(a.get());
			}
		}
		projeto.setAluno(alunosTemp);
		projetoRepository.save(projeto);

		return new ResponseEntity<Projeto>(projeto,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_projeto')")
	@PostMapping(value = "{id}/email")
	public ResponseEntity<Projeto> resendMail(@PathVariable long id) {

		Projeto projeto = projetoRepository.findById(id);

		try {
			mailService.sendCredenciaisDocenteEmail(projeto.getResponsavel());
		} catch (IOException e) {
			e.printStackTrace();
		}

		for(Aluno membro : projeto.getAluno()){
			Usuario aluno = usuarioRepository.findBySiape(membro.getSiape());
			try {
				mailService.sendCadastroAluno(aluno.getNomeUsuario(), aluno.getSenha(), aluno.getEmail().trim());
			} catch (IOException e) {
				e.printStackTrace();
			}
		}


		return new ResponseEntity<Projeto>(HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('delete_projeto')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(projetoService.isExist(id)) {
			projetoRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_projeto')")
	@GetMapping("/page")
	public ResponseEntity<Page<Projeto>> getAll(@PageableDefault(page = 0, size = 3, sort = "titulo", 
			direction = Sort.Direction.ASC) Pageable pageable) {
		Page<Projeto> lista = projetoRepository.findAll(pageable);
		return new ResponseEntity<Page<Projeto>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_projeto')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Projeto> getById(@PathVariable long id) {
		Projeto projeto = projetoRepository.findById(id);
		return new ResponseEntity<Projeto>(projeto,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_projeto')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Projeto> update(@RequestBody Projeto projeto, @PathVariable long id) {
		if(projetoService.isExist(id)) {
			projeto.setId(id);
			projetoRepository.save(projeto);
			return new ResponseEntity<Projeto>(projeto,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Projeto>(projeto,HttpStatus.NOT_FOUND);
	}
	
	@PreAuthorize("hasAuthority('view_frequencia')")
	@GetMapping("/alunosByProjeto")
	public ResponseEntity<Collection<Aluno>> getAlunosByProjeto(@RequestParam Long projeto) {
		Optional<Projeto> proj = this.projetoRepository.findById(projeto);
		List<Aluno> alunosProjeto = new ArrayList<Aluno>();
		alunosProjeto.addAll(proj.get().getAluno());

		return new ResponseEntity<Collection<Aluno>>(alunosProjeto,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_projeto')")
	@GetMapping("/responsavel")
	public ResponseEntity<Collection<Projeto>> getProjetosByResponsavel(@RequestParam Long siape) {
		List<Projeto> projetosFind = this.projetoRepository.findByResponsavelSiape(siape);
		return new ResponseEntity<Collection<Projeto>>(projetosFind,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_projeto')")
	@GetMapping("/byAluno")
	public ResponseEntity<Collection<Projeto>> getProjetosByAluno(@RequestParam Long alunoId) {
		List<Projeto> projetosFind = this.projetoRepository.findByAlunoId(alunoId);
		return new ResponseEntity<Collection<Projeto>>(projetosFind,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_projeto')")
	@GetMapping("/searchFilter")
	public ResponseEntity<Collection<Projeto>> searchByFilters(@RequestParam Long projeto, @RequestParam Long periodo, 
			@RequestParam Long aluno, @RequestParam Long responsavel) {
		
		Collection<Projeto> projetos = projetoRepository.findAll();
		Map<Long, Projeto> projetosFiltersResult = new HashMap<Long, Projeto>();
		
		Optional<Projeto> projetoFind = this.projetoRepository.findById(projeto);
		
		Optional<Aluno> alunoFind = this.alunoRepository.findById(aluno);
		
		Optional<Usuario> responsavelFind = this.usuarioRepository.findById(responsavel);
		
		Collection<Projeto> projetosCustom = null;
		
		if (projetosFiltersResult.size() > 0) {
				
			projetos = projetosFiltersResult.values();	
				
		}else {
					
			projetosCustom = projetoCustomRepository
					.findAdvancedDSL(
							projetoFind.isPresent() ? projetoFind.get() : null, 
							alunoFind.isPresent() ? alunoFind.get() : null, 
							responsavelFind.isPresent() ? responsavelFind.get() : null);
			
		projetos = projetosCustom;
				
		}
			
		return new ResponseEntity<Collection<Projeto>>(projetos,HttpStatus.OK);

	}

	@PreAuthorize("hasAuthority('view_projeto')")
	@Override
	@GetMapping()
	public ResponseEntity<List<Projeto>> getAll() {
		List<Projeto> list = this.projetoRepository.findAll();
		return new ResponseEntity<List<Projeto>>(list, HttpStatus.OK);
	}

}
