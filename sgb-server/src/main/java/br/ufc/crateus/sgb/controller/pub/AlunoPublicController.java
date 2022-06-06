package br.ufc.crateus.sgb.controller.pub;

import java.util.Date;

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

import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.repository.AlunoRepository;
import br.ufc.crateus.sgb.service.AlunoService;

/**
 * Controlador Rest Pública para manejar API referentes a entidade Aluno 
 * @author Leonardo Dutra
 * @see AlunoRepository
 * @see AlunoService
 * @see Aluno
 */
@RequestMapping("/public/api/aluno")
@RestController
public class AlunoPublicController {

	@Autowired
	private AlunoRepository alunoRepository;
	
	@Autowired
	private AlunoService alunoService;
	
	@GetMapping("/search")
	public ResponseEntity<Aluno> getById(@RequestParam String cpf) {
		Aluno aluno = alunoRepository.findByCpf(cpf);
		return new ResponseEntity<Aluno>(aluno,HttpStatus.OK);
	}

	@PostMapping
	public ResponseEntity<Aluno> add(@RequestBody Aluno aluno) {
		aluno.setUltimaAtualizacaoCadastral(new Date());
		aluno.setDataHora(new Date());
		
		alunoRepository.save(aluno);
		return new ResponseEntity<Aluno>(aluno,HttpStatus.OK);
	}

	@PutMapping(value="{id}")
	public ResponseEntity<Aluno> update(@RequestBody Aluno aluno, @PathVariable long id) {
		if(alunoService.isExist(id)) {
			aluno.setDataHora(new Date());
			aluno.setUltimaAtualizacaoCadastral(new Date());
			aluno.setId(id);
			alunoRepository.save(aluno);
			return new ResponseEntity<Aluno>(aluno,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Aluno>(aluno,HttpStatus.NOT_FOUND);
	}
	
	@GetMapping(value="{id}")
	public ResponseEntity<Aluno> getById(@PathVariable long id) {
		Aluno aluno = alunoRepository.findById(id);
		return new ResponseEntity<Aluno>(aluno,HttpStatus.OK);
	}
}
