package br.ufc.crateus.sgb.controller;

import java.time.LocalDate;
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
import br.ufc.crateus.sgb.model.Entrevista;
import br.ufc.crateus.sgb.repository.EntrevistaRepository;
import br.ufc.crateus.sgb.service.EntrevistaService;

/**
 * Controlador Rest para manejar API referentes a entidade Entrevista 
 * @author Leonardo Dutra
 * @see EntrevistaRepository
 * @see EntrevistaService
 * @see Entrevista
 */
@RequestMapping("/api/processo/entrevista")
@RestController
public class EntrevistaController implements ICrud<Entrevista> {
	
	@Autowired
	private EntrevistaRepository entrevistaRepository;
	
	@Autowired
	private EntrevistaService entrevistaService;

	@PreAuthorize("hasAuthority('add_entrevista')")
	@PostMapping
	@Override
	public ResponseEntity<Entrevista> add(@RequestBody Entrevista entrevista) {
		entrevista.setDataRegistro(LocalDate.now());
		entrevistaRepository.save(entrevista);
		return new ResponseEntity<Entrevista>(entrevista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_entrevista')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Entrevista> update(@RequestBody Entrevista entrevista, @PathVariable long id) {
		if(entrevistaService.isExist(id)) {
			entrevista.setId(id);
			entrevistaRepository.save(entrevista);
			return new ResponseEntity<Entrevista>(entrevista,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Entrevista>(entrevista,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_entrevista')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(entrevistaService.isExist(id)) {
			entrevistaRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_entrevista')")
	@GetMapping
	@Override
	public ResponseEntity<List<Entrevista>> getAll() {
		List<Entrevista> lista = entrevistaRepository.findAll();
		return new ResponseEntity<List<Entrevista>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_entrevista')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Entrevista> getById(@PathVariable long id) {
		Entrevista entrevista = entrevistaRepository.findById(id);
		return new ResponseEntity<Entrevista>(entrevista,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_entrevista')")
	@GetMapping("/searchByInscricao")
	public ResponseEntity<Entrevista> getByInscricaoId(@RequestParam long inscricao){
		Entrevista entrevista = entrevistaRepository.findByInscricaoId(inscricao);
		return new ResponseEntity<Entrevista>(entrevista, HttpStatus.OK);
	}

}
