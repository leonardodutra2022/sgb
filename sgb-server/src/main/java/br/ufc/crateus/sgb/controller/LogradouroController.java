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
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.interfaces.ICrud;
import br.ufc.crateus.sgb.model.Logradouro;
import br.ufc.crateus.sgb.repository.LogradouroRepository;
import br.ufc.crateus.sgb.service.LogradouroService;

/**
 * Controlador Rest para manejar API referentes a entidade Logradouro 
 * @author Leonardo Dutra
 * @see ICrud
 * @see Logradouro
 * @see LogradouroRepository
 * @see LogradouroService
 */
@RequestMapping("/api/logradouro")
@RestController
public class LogradouroController implements ICrud<Logradouro>{

	@Autowired
	private LogradouroRepository logradouroRepository;
	
	@Autowired
	private LogradouroService logradouroService;
	
	@PreAuthorize("hasAuthority('add_logradouro')")
	@PostMapping
	@Override
	public ResponseEntity<Logradouro> add(@RequestBody Logradouro logradouro) {
		logradouroRepository.save(logradouro);
		return new ResponseEntity<Logradouro>(logradouro,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_logradouro')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Logradouro> update(@RequestBody Logradouro logradouro, @PathVariable long id) {
		if(logradouroService.isExist(id)) {
			logradouro.setId(id);
			logradouroRepository.save(logradouro);
			return new ResponseEntity<Logradouro>(logradouro,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Logradouro>(logradouro,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_logradouro')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(logradouroService.isExist(id)) {
			logradouroRepository.deleteById(id);			
		}		
	}

	@PreAuthorize("hasAuthority('view_logradouro')")
	@GetMapping
	@Override
	public ResponseEntity<List<Logradouro>> getAll() {
		List<Logradouro> lista = logradouroRepository.findAllByOrderByNomeRuaAsc();
		return new ResponseEntity<List<Logradouro>>(lista, HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_logradouro')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Logradouro> getById(@PathVariable long id) {
		Logradouro logradouro = logradouroRepository.findById(id);
		return new ResponseEntity<Logradouro>(logradouro,HttpStatus.OK);
	}

}
