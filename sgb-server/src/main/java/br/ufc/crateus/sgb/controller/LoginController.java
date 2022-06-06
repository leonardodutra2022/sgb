package br.ufc.crateus.sgb.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.model.dto.UsuarioDTO;
import br.ufc.crateus.sgb.service.UsuarioService;

/**
 * Controlador Rest para Login e autenticação 
 * @author Leonardo Dutra
 * @see UsuarioService
 *
 */
@RequestMapping("/api/login")
@RestController
public class LoginController {

	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping
	public ResponseEntity<UsuarioDTO> getUser(Principal userSession){
		try {
			UsuarioDTO usuarioTemp = new UsuarioDTO(usuarioService.getByNomeUsuario(userSession.getName()));
			
			return new ResponseEntity<UsuarioDTO>(usuarioTemp, HttpStatus.OK);
		} catch(Exception e) {
			return new ResponseEntity<UsuarioDTO>(HttpStatus.UNAUTHORIZED);
		}
	}
	
}
