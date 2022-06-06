package br.ufc.crateus.sgb.controller;

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
import br.ufc.crateus.sgb.model.SituacaoSocioEconFamiliar;
import br.ufc.crateus.sgb.repository.SituacaoSocioEconFamiliarRepository;
import br.ufc.crateus.sgb.service.SituacaoSocioEconFamiliarService;

/**
 * Controlador Rest para manejar API referentes a entidade SituacaoSocioEconFamiliar 
 * @author Leonardo Dutra
 * @see ICrud
 * @see SituacaoSocioEconFamiliar
 * @see SituacaoSocioEconFamiliarRepository
 * @see SituacaoSocioEconFamiliarService
 */
@RequestMapping("/api/aluno/socioeconomico")
@RestController
public class SituacaoSocioEconFamiliarController implements ICrud<SituacaoSocioEconFamiliar>{

	@Autowired
	private SituacaoSocioEconFamiliarRepository socioRepository;
	
	@Autowired
	private SituacaoSocioEconFamiliarService socioService;
	
	@PreAuthorize("hasAuthority('add_socioecon')")
	@PostMapping
	@Override
	public ResponseEntity<SituacaoSocioEconFamiliar> add(@RequestBody SituacaoSocioEconFamiliar socio) {
		
		if(!socioService.isExist(socio.getNomeCompleto(), socio.getIdade(), socio.getAluno())) {
			socioRepository.save(socio);
			return new ResponseEntity<SituacaoSocioEconFamiliar>(socio,HttpStatus.OK);
		}else {
			return new ResponseEntity<SituacaoSocioEconFamiliar>(socio,HttpStatus.NOT_ACCEPTABLE);			
		}
	}

	@PreAuthorize("hasAuthority('edit_socioecon')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<SituacaoSocioEconFamiliar> update(@RequestBody SituacaoSocioEconFamiliar socio, 
			@PathVariable long id) {
		if(socioService.isExist(id)) {
			socio.setId(id);
			socioRepository.save(socio);
			return new ResponseEntity<SituacaoSocioEconFamiliar>(socio,HttpStatus.OK);
		} 
		
		return new ResponseEntity<SituacaoSocioEconFamiliar>(socio,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_socioecon')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(socioService.isExist(id)) {
			socioRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_socioecon')")
	@GetMapping
	@Override
	public ResponseEntity<List<SituacaoSocioEconFamiliar>> getAll() {
		List<SituacaoSocioEconFamiliar> lista = socioRepository.findAll();
		return new ResponseEntity<List<SituacaoSocioEconFamiliar>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_socioecon')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<SituacaoSocioEconFamiliar> getById(@PathVariable long id) {
		SituacaoSocioEconFamiliar socio = socioRepository.findById(id);
		return new ResponseEntity<SituacaoSocioEconFamiliar>(socio,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_socioecon')")
	@GetMapping("/search")
	public ResponseEntity<List<SituacaoSocioEconFamiliar>> getByAluno(@RequestParam long aluno) {
		List<SituacaoSocioEconFamiliar> dadosSocioEcon = socioRepository.findByAlunoId(aluno);
		return new ResponseEntity<List<SituacaoSocioEconFamiliar>>(dadosSocioEcon,HttpStatus.OK);
	}

}
