package br.ufc.crateus.sgb.controller;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.model.enums.Perfis;
import br.ufc.crateus.sgb.repository.AlunoRepository;
import br.ufc.crateus.sgb.repository.UsuarioRepository;
import br.ufc.crateus.sgb.service.MailService;
import br.ufc.crateus.sgb.service.UsuarioService;

/**
 * Controlador Rest para manejar API referentes a entidade Usuario 
 * @author Leonardo Dutra
 * @see ICrud
 * @see Usuario
 * @see UsuarioRepository
 */
@RequestMapping("/api/user")
@RestController
public class UsuarioController implements ICrud<Usuario>{

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private AlunoRepository alunoRepository;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private MailService mailService;
		
	@PreAuthorize("hasAuthority('add_user')")
	@PostMapping
	@Override
	public ResponseEntity<Usuario> add(@RequestBody Usuario usuario) {
		
		boolean isDocente = false;
		boolean isTae = false;
		
		switch(usuario.getPapel()) {
			case "Aluno":
				usuario.setPerfils(Arrays.asList(Perfis.aluno));
				break;
			case "Membro":
				usuario.setPerfils(Arrays.asList(Perfis.membro_comissao));
				break;
			case "Tecnico_Administrativo":
				usuario.setPerfils(Arrays.asList(Perfis.tae));
				isTae = true;
				break;
			case "Docente":
				usuario.setPerfils(Arrays.asList(Perfis.docente));
				isDocente = true;
				break;
			default:
				usuario.setPerfils(Arrays.asList(Perfis.admin));
		}

		usuario.setDataHora(new Date());		
		
			if(!this.usuarioService.isExist(usuario)) {
				usuarioRepository.save(usuario);
				
				if(isDocente || isTae) {
					try {
						mailService.sendCredenciaisDocenteEmail(usuario);
					} catch (IOException e) {
						e.printStackTrace();
					}
				}
				return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
			}
				
		
		return new ResponseEntity<Usuario>(usuario, HttpStatus.BAD_REQUEST);
	}

	@PreAuthorize("hasAuthority('edit_user')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Usuario> update(@RequestBody Usuario usuario, @PathVariable long id) {
		usuario.setPerfils(null);
		if(usuarioRepository.findById(id) != null) {
			
			switch(usuario.getPapel()) {
			case "Aluno":
				usuario.setPerfils(Arrays.asList(Perfis.aluno));
				break;
			case "Membro":
				usuario.setPerfils(Arrays.asList(Perfis.membro_comissao));
				break;
			case "Tecnico_Administrativo":
				usuario.setPerfils(Arrays.asList(Perfis.tae));
				break;
			case "Docente":
				usuario.setPerfils(Arrays.asList(Perfis.docente));
				break;
			default:
				usuario.setPerfils(Arrays.asList(Perfis.admin));
			}
			
			usuarioRepository.save(usuario);
			return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
		}else {
			return new ResponseEntity<Usuario>(usuario, HttpStatus.NOT_FOUND);
		}
	}
	
	@PreAuthorize("hasAuthority('view_user')")
	@GetMapping("/matricula")
	public ResponseEntity<Usuario> updateMatricula(@RequestParam long idUsuario, @RequestParam Long matricula) {
		
		Usuario usuario = usuarioRepository.findById(idUsuario);
		
		if(usuario != null) {
			usuario.setSiape(matricula);
			usuarioRepository.save(usuario);
			return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
		}
		
		return new ResponseEntity<Usuario>(usuario, HttpStatus.NOT_FOUND);
		
	}
	
	@PreAuthorize("hasAuthority('view_user')")
	@GetMapping("/updateDados")
	public ResponseEntity<Usuario> updateDados(@RequestParam long idUsuario, @RequestParam Long matricula,
			@RequestParam String email, @RequestParam String telefone, @RequestParam String curso,
			@RequestParam String nome) {
		
		Usuario usuario = usuarioRepository.findById(idUsuario);
		
		if(usuario != null) {
			usuario.setSiape(matricula);
			usuario.setEmail(email.trim());
			usuario.setTelefoneResponsavel(telefone.trim());
			usuario.setCursoResponsavel(curso.trim());
			usuario.setNomeCompleto(nome.trim());
			
			usuarioRepository.save(usuario);
			updateAluno(usuario);
			return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
		}
		
		return new ResponseEntity<Usuario>(usuario, HttpStatus.NOT_FOUND);
		
	}

	@PreAuthorize("hasAuthority('view_user')")
	@GetMapping("/versionUpdate")
	public ResponseEntity<Usuario> updateVersionRecent(@RequestParam long idUsuario, @RequestParam String versionRecent) {
		
		Usuario usuario = usuarioRepository.findById(idUsuario);
		
		if(usuario != null) {
			usuario.setVersionUpdated(versionRecent);
			usuario.setSisUpdated(true);
			usuarioRepository.save(usuario);
			return new ResponseEntity<Usuario>(usuario, HttpStatus.OK);
		}
		return new ResponseEntity<Usuario>(usuario, HttpStatus.NOT_FOUND);
	}
	
	@PreAuthorize("hasAuthority('delete_user')")
	@DeleteMapping(path="/{id}")
	@Override
	public void delete(@PathVariable long id) {
		usuarioRepository.deleteById(id);
	}

	@PreAuthorize("hasAuthority('view_user')")
	@GetMapping
	@Override
	public ResponseEntity<List<Usuario>> getAll() {
		return new ResponseEntity<List<Usuario>>((List<Usuario>) usuarioRepository
				.findAllByOrderByNomeCompletoAsc(), HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_user')")
	@GetMapping(path="/{id}")
	@Override
	public ResponseEntity<Usuario> getById(@PathVariable long id) {
		return new ResponseEntity<Usuario>(usuarioRepository.findById(id), HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_user')")
	@GetMapping(params="email")
	public ResponseEntity<Usuario> searchByEmail(@RequestParam("email") String email) {
		Optional<Usuario> u = usuarioRepository.findByEmail(email);
		if(u.isPresent()) {
			return new ResponseEntity<Usuario>(u.get(), HttpStatus.OK);			
		}
		return new ResponseEntity<Usuario>(u.get(), HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('view_user')")
	@GetMapping("/getByMatricula")
	public ResponseEntity<Usuario> getByMatricula(@RequestParam Long matricula) {
		Usuario usuario = usuarioRepository.findBySiape(matricula);
		return new ResponseEntity<Usuario>(usuario,HttpStatus.OK);
	}
	
	@GetMapping("/getByEmail")
	public ResponseEntity<Usuario> getByEmail(@RequestParam String email) {
		Optional<Usuario> u = usuarioRepository.findByEmail(email);
		if(u.isPresent()) {
			return new ResponseEntity<Usuario>(u.get(),HttpStatus.OK);			
		}
		return new ResponseEntity<Usuario>(u.get(),HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/responsaveis")
	public ResponseEntity<List<Usuario>> getResponsaveis() {
		List<Usuario> usuario = usuarioRepository.findCustomResponsaveis();
		return new ResponseEntity<List<Usuario>>(usuario,HttpStatus.OK);
	}
	
	boolean updateAluno(Usuario usuario) {
		Aluno alunoFind = this.alunoRepository.findBySiape(usuario.getSiape());
		
		alunoFind.setNomeCompleto(usuario.getNomeCompleto());
		alunoFind.setCursoAtual(usuario.getCursoResponsavel());
		alunoFind.setTelefoneFixo(usuario.getTelefoneResponsavel());
		alunoFind.setEmail(usuario.getEmail());
		alunoFind.setNomeCompleto(usuario.getNomeCompleto());
		this.alunoRepository.save(alunoFind);
		return true;
	}
}
