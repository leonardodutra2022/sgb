package br.ufc.crateus.sgb.controller;

import java.security.NoSuchAlgorithmException;
import org.jasypt.util.text.BasicTextEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.exception.ApiError;
import br.ufc.crateus.sgb.service.UsuarioService;

@RequestMapping("/api/assinatura")
@RestController
public class AssinaturaEletronicaController {
	
	private final String KEY = "$KEY";
	
	@Autowired
	private UsuarioService usuarioService;
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/check/credenciais")
	public ResponseEntity<Boolean> checkCredenciais(@RequestParam String usuario, @RequestParam String pass) throws NoSuchAlgorithmException{

		String t = "oi teste";
		
		// melhor método
		BasicTextEncryptor te = new BasicTextEncryptor();
		te.setPasswordCharArray(KEY.toCharArray());
		
		return new ResponseEntity<Boolean>(false,HttpStatus.UNAUTHORIZED);
		
	}
	
	@PreAuthorize("hasAuthority('view_frequencia_registro')")
	@GetMapping("/check")
	public ResponseEntity<?> checkCredencial(@RequestParam String u, @RequestParam String p){

		if(this.usuarioService.checkCredencial(u.trim(), p.trim()))
			return new ResponseEntity<Boolean>(true,HttpStatus.OK);

		ApiError erro = new ApiError(400, "Credenciais Inválidas!", 
				"Esse erro está associado a caracteres inválidos em sua senha ou nome de usuário, ou ainda, dados incorretos. Caso seus dados estejam corretos, atualize sua senha sem usar caracteres especiais, como barras, asteriscos ou #...");
		return new ResponseEntity<ApiError>(erro,HttpStatus.BAD_REQUEST);
		
	}

}
