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
import br.ufc.crateus.sgb.model.Recurso;
import br.ufc.crateus.sgb.repository.RecursoRepository;
import br.ufc.crateus.sgb.service.RecursoService;

/**
 * Controlador Rest para manejar API referentes a entidade Recurso 
 * @author Leonardo Dutra
 * @see ICrud
 * @see Recurso
 * @see RecursoRepository
 * @see RecursoService
 */
@RequestMapping("/api/inscricao/recurso")
@RestController
public class RecursoController implements ICrud<Recurso>{

	@Autowired
	private RecursoRepository recursoRepository;
	
	@Autowired
	private RecursoService recursoService;
	
	@PreAuthorize("hasAuthority('add_recurso')")
	@PostMapping
	@Override
	public ResponseEntity<Recurso> add(@RequestBody Recurso recurso) {
		recursoRepository.save(recurso);
		return new ResponseEntity<Recurso>(recurso,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_recurso')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Recurso> update(@RequestBody Recurso recurso, @PathVariable long id) {
		if(recursoService.isExist(id)) {
			recurso.setId(id);
			recursoRepository.save(recurso);
			return new ResponseEntity<Recurso>(recurso,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Recurso>(recurso,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_recurso')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(recursoService.isExist(id)) {
			recursoRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_recurso')")
	@GetMapping
	@Override
	public ResponseEntity<List<Recurso>> getAll() {
		List<Recurso> lista = recursoRepository.findAllByOrderByInscricaoId();
		return new ResponseEntity<List<Recurso>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_recurso')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Recurso> getById(@PathVariable long id) {
		Recurso recurso = recursoRepository.findById(id);
		return new ResponseEntity<Recurso>(recurso,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_recurso')")
	@GetMapping("/searchByInscricao")
	public ResponseEntity<List<Recurso>> getByInscricaoId(@RequestParam long inscricao){
		List<Recurso> recursos = recursoRepository.findByInscricaoId(inscricao);
		return new ResponseEntity<List<Recurso>>(recursos, HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_recurso')")
	@GetMapping("/processo")
	public ResponseEntity<List<Recurso>> getByProcesso(@RequestParam long id){
		List<Recurso> recursos = recursoRepository.findByProcessoId(id);
		return new ResponseEntity<List<Recurso>>(recursos, HttpStatus.OK);
	}

}
