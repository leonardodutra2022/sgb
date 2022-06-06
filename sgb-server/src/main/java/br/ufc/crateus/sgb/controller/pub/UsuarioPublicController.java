package br.ufc.crateus.sgb.controller.pub;

import java.io.IOException;
import java.util.Arrays;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.model.basic.UsuarioBasic;
import br.ufc.crateus.sgb.model.enums.Perfis;
import br.ufc.crateus.sgb.repository.UsuarioRepository;
import br.ufc.crateus.sgb.service.MailService;
import br.ufc.crateus.sgb.service.UsuarioService;

/**
 * Controlador Rest Público para manejar API referentes a entidade Usuario 
 * @author Leonardo Dutra
 * @see UsuarioRepository
 * @see UsuarioService
 * @see UsuarioBasic
 * @see Usuario
 */
@RequestMapping("/public/api/usuario")
@RestController
public class UsuarioPublicController {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private MailService emailService;
	
	@GetMapping("/getByEmail")
	public ResponseEntity<UsuarioBasic> getByEmail(@RequestParam String email) {
		Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
		UsuarioBasic temp = new UsuarioBasic();
		
		if(usuario.isPresent()) {
			temp = this.getUsuarioBasic(usuario.get());
			return new ResponseEntity<UsuarioBasic>(temp,HttpStatus.OK);
		} else {
			temp = null;
			return new ResponseEntity<UsuarioBasic>(temp,HttpStatus.NOT_FOUND);
		}
		
	}
	
	@GetMapping("/recover")
	public ResponseEntity<UsuarioBasic> recoverEmail(@RequestParam String email) {
		Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
		
		UsuarioBasic temp = new UsuarioBasic();
		
		if(usuario.isPresent()) {
			temp = this.getUsuarioBasic(usuario.get());
			try {
				emailService.sendRecoverEmail(email, usuario.get());
			} catch (IOException e) {
				e.printStackTrace();
				return new ResponseEntity<UsuarioBasic>(temp,HttpStatus.BAD_REQUEST);
			}
			return new ResponseEntity<UsuarioBasic>(temp,HttpStatus.OK);
		}else {
			temp = null;
			return new ResponseEntity<UsuarioBasic>(temp,HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("/getByMatricula")
	public ResponseEntity<UsuarioBasic> getByMatricula(@RequestParam Long matricula) {
		Usuario usuario = usuarioRepository.findBySiape(matricula);
		
		UsuarioBasic temp = new UsuarioBasic();
		
		if(usuario != null) {
			temp = this.getUsuarioBasic(usuario);
			return new ResponseEntity<UsuarioBasic>(temp,HttpStatus.OK);
		} else {
			temp = null;
		}
		return new ResponseEntity<UsuarioBasic>(temp,HttpStatus.OK);
	}
	
	@GetMapping("/getByNomeUsuario")
	public ResponseEntity<UsuarioBasic> getByNomeUsuario(@RequestParam String nomeUsuario) {
		Usuario usuario = usuarioRepository.findByNomeUsuario(nomeUsuario);
		UsuarioBasic temp = new UsuarioBasic();
		
		if(usuario != null) {
			temp = this.getUsuarioBasic(usuario);
			return new ResponseEntity<UsuarioBasic>(temp,HttpStatus.OK);
		} else {
			temp = null;
		}
		
		return new ResponseEntity<UsuarioBasic>(temp,HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<UsuarioBasic> add(@RequestBody Usuario usuario) {
		usuario.setDataHora(new Date());
		
		switch(usuario.getPapel()) {
		case "Aluno":
			usuario.setPerfils(Arrays.asList(Perfis.aluno));
		break;
		case "Membro":
			usuario.setPerfils(Arrays.asList(Perfis.membro_comissao));
		break;
		default:
			usuario.setPerfils(Arrays.asList(Perfis.admin));
		}
		
		UsuarioBasic temp = this.getUsuarioBasic(usuario);
		if(!usuarioService.isExist(usuario.getSiape())) {
			usuarioRepository.save(usuario);
			return new ResponseEntity<UsuarioBasic>(temp, HttpStatus.OK);
		}else {
			return new ResponseEntity<UsuarioBasic>(new UsuarioBasic(), HttpStatus.NOT_MODIFIED);
		}
	}

	@PutMapping(value="{id}")
	public ResponseEntity<UsuarioBasic> update(@RequestBody Usuario usuario, @PathVariable long id) {
		usuario.setDataHora(new Date());
		
		if(usuarioRepository.findById(id) != null) {
		
			switch(usuario.getPapel()) {
			case "Aluno":
				usuario.setPerfils(Arrays.asList(Perfis.aluno));
			break;
			case "Membro":
				usuario.setPerfils(Arrays.asList(Perfis.membro_comissao));
			break;
			default:
				usuario.setPerfils(Arrays.asList(Perfis.admin));
			}
			
			UsuarioBasic temp = this.getUsuarioBasic(usuario);
			
			usuarioRepository.save(usuario);
			return new ResponseEntity<UsuarioBasic>(temp, HttpStatus.OK);
		}else {
			return new ResponseEntity<UsuarioBasic>(new UsuarioBasic(), HttpStatus.NOT_MODIFIED);
		}
	}
	
	private UsuarioBasic getUsuarioBasic(Usuario usuario) {
		UsuarioBasic temp = new UsuarioBasic();
		temp.setId(usuario.getId());
		temp.setNomeUsuario(usuario.getNomeUsuario());
		temp.setNomeCompleto(usuario.getNomeCompleto());
		temp.setEmail(usuario.getEmail());
		return temp;
	}
}
