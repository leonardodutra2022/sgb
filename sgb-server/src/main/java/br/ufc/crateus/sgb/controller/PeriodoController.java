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
import br.ufc.crateus.sgb.model.Periodo;
import br.ufc.crateus.sgb.repository.PeriodoRepository;
import br.ufc.crateus.sgb.service.PeriodoService;


/**
 * Controlador Rest para manejar API referentes a entidade Periodo
 * @author Leonardo Dutra
 * @see ICrud
 * @see Periodo
 * @see PeriodoRepository
 * @see PeriodoService
 */
@RequestMapping("/api/periodo")
@RestController
public class PeriodoController implements ICrud<Periodo>{

	@Autowired
	private PeriodoRepository periodoRepository;
	
	@Autowired
	private PeriodoService periodoService;
	
	@PreAuthorize("hasAuthority('add_periodo')")
	@PostMapping
	@Override
	public ResponseEntity<Periodo> add(@RequestBody Periodo periodo) {
		periodoRepository.save(periodo);
		return new ResponseEntity<Periodo>(periodo,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('delete_periodo')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(periodoService.isExist(id)) {
			periodoRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_periodo')")
	@GetMapping
	@Override
	public ResponseEntity<List<Periodo>> getAll() {
		List<Periodo> lista = periodoRepository.findAll();
		return new ResponseEntity<List<Periodo>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_periodo')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Periodo> getById(@PathVariable long id) {
		Periodo periodo = periodoRepository.findById(id);
		return new ResponseEntity<Periodo>(periodo,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_periodo')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Periodo> update(@RequestBody Periodo periodo, @PathVariable long id) {
		if(periodoService.isExist(id)) {
			periodo.setId(id);
			periodoRepository.save(periodo);
			return new ResponseEntity<Periodo>(periodo,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Periodo>(periodo,HttpStatus.NOT_FOUND);
	}

}
