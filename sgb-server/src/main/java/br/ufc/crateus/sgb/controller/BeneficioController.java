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
import br.ufc.crateus.sgb.model.Beneficio;
import br.ufc.crateus.sgb.repository.BeneficioRepository;
import br.ufc.crateus.sgb.service.BeneficioService;

/**
 * Controlador Rest para manejar API referentes a entidade Beneficio 
 * @author Leonardo Dutra
 * @see BeneficioRepository
 * @see BeneficioService
 * @see Beneficio
 */
@RequestMapping("/api/beneficio")
@RestController
public class BeneficioController implements ICrud<Beneficio>{

	@Autowired
	private BeneficioRepository beneficioRepository;
	
	@Autowired
	private BeneficioService beneficioService;
	
	@PreAuthorize("hasAuthority('add_beneficio')")
	@PostMapping
	@Override
	public ResponseEntity<Beneficio> add(@RequestBody Beneficio beneficio) {
		beneficioRepository.save(beneficio);
		return new ResponseEntity<Beneficio>(beneficio,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_beneficio')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Beneficio> update(@RequestBody Beneficio beneficio, @PathVariable long id) {
		if(beneficioService.isExist(id)) {
			beneficio.setId(id);
			beneficioRepository.save(beneficio);
			return new ResponseEntity<Beneficio>(beneficio,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Beneficio>(beneficio,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_beneficio')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(beneficioService.isExist(id)) {
			beneficioRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_beneficio')")
	@GetMapping
	@Override
	public ResponseEntity<List<Beneficio>> getAll() {
		List<Beneficio> lista = beneficioRepository.findAll();
		return new ResponseEntity<List<Beneficio>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_beneficio')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Beneficio> getById(@PathVariable long id) {
		Beneficio beneficio = beneficioRepository.findById(id);
		return new ResponseEntity<Beneficio>(beneficio,HttpStatus.OK);
	}

}
