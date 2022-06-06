package br.ufc.crateus.sgb.controller;

import java.nio.charset.Charset;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.exception.ApiError;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.repository.AlunoRepository;
import br.ufc.crateus.sgb.repository.UsuarioRepository;
import br.ufc.crateus.sgb.service.UsuarioService;
import br.ufc.crateus.sgb.utils.RubricaUtils;


@RequestMapping("/api/rubrica")
@RestController
public class RubricaController {

	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private UsuarioService usuarioService;
	
	@Autowired
	private AlunoRepository alunoRepository;
	
	@PreAuthorize("hasAuthority('view_user')")
	@PostMapping
	public ResponseEntity<?> add(@RequestBody RubricaUtils rubrica) {
		
		long id = rubrica.getUsuarioId();
		
		Optional<Usuario> usuario = null;
		if(this.usuarioService.getById(id).isPresent()) {
			usuario = this.usuarioService.getById(id);
			Usuario uTemp = usuario.get();
			
			byte[] rub = rubrica.getRubricaBase64String().getBytes();
			
			uTemp.setRubrica(rub);
			
			this.usuarioRepository.save(uTemp);

			uTemp.setSenha(null);
			uTemp.setNomeUsuario(null);
			
			return new ResponseEntity<RubricaUtils>(rubrica, HttpStatus.OK);
		}else {
			usuario = Optional.empty();
			ApiError erro = new ApiError(404, "Erro ao obter informações atualizadas de sessão/usuário!", 
					"Deslogue e logue novamente no botão de desligar no canto superior direito do sistema, para recarregar tais informações atualizadas...");
			return new ResponseEntity<ApiError>(erro, HttpStatus.NOT_FOUND);
		}

	}
	
	
	@PreAuthorize("hasAuthority('view_user')")
	@GetMapping(path="/{id}")
	public ResponseEntity<?> getById(@PathVariable long id) {
		
		RubricaUtils r = new RubricaUtils();
		r.setUsuarioId(id);
		
		Optional<Usuario> usuario = null;
		if(this.usuarioService.getById(id).isPresent()) {
			usuario = this.usuarioService.getById(id);
			Usuario uTemp = usuario.get();
			
			if(uTemp.getRubrica() != null) {
				
				r.setHasRubrica(true);
				
				byte[] blob = uTemp.getRubrica();
				
				String texto = new String(blob, Charset.defaultCharset());
				r.setRubricaBase64String(texto);
				
			}else {
				r.setRubricaBase64String("");
				r.setHasRubrica(false);
			}
			
			return new ResponseEntity<RubricaUtils>(r, HttpStatus.OK);
		}else {
			ApiError erro = new ApiError(404, "Erro ao obter informações atualizadas de sessão/usuário!", 
					"Deslogue e logue novamente no botão de desligar no canto superior direito do sistema, para recarregar tais informações atualizadas...");
			return new ResponseEntity<ApiError>(erro, HttpStatus.NOT_FOUND);
		}
	}
	
	@PreAuthorize("hasAuthority('view_user')")
	@GetMapping("/")
	public ResponseEntity<?> getRubricaByAluno(@RequestParam Long alunoId) {
		
		RubricaUtils r = new RubricaUtils();
		Usuario usuarioAluno = new Usuario();
		Aluno aluno = new Aluno();
		
		if(alunoId == null) {
			ApiError erro = new ApiError(400, "Informação de requisição do aluno ausente!", 
					"Deslogue e logue novamente no botão de desligar no canto superior direito do sistema, para recarregar informações atualizadas, caso contrário, se persistir o erro, informe ao suporte em: sgb.ufc.crateus@gmail.com, informando erro em seu cadastro, conforme descrito neste erro...");			
			return new ResponseEntity<ApiError>(erro, HttpStatus.BAD_REQUEST);
		}
			
		
		Optional<Aluno> alunoFind = this.alunoRepository.findById(alunoId);
		
		if(!alunoFind.isPresent()) {
			ApiError erro = new ApiError(404, "Aluno não encontrado...", 
					"Deslogue e logue novamente no botão de desligar no canto superior direito do sistema, para recarregar informações atualizadas, caso contrário, se persistir o erro, informe ao suporte em: sgb.ufc.crateus@gmail.com, informando erro em seu cadastro, conforme descrito neste erro...");
			return new ResponseEntity<ApiError>(erro, HttpStatus.NOT_FOUND);
		}else {
			aluno = alunoFind.get();
			usuarioAluno = this.usuarioRepository.findBySiape(aluno.getSiape());
			
			r.setUsuarioId(usuarioAluno.getId());
			
			if(usuarioAluno.getRubrica() != null) {
				
				r.setHasRubrica(true);
				
				byte[] blob = usuarioAluno.getRubrica();
				
				String texto = new String(blob, Charset.defaultCharset());
				r.setRubricaBase64String(texto);
				
			}else {
				r.setRubricaBase64String("");
				r.setHasRubrica(false);
			}
			
			return new ResponseEntity<RubricaUtils>(r, HttpStatus.OK);	
		}
		
	}
}
