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
import br.ufc.crateus.sgb.model.Cronograma;
import br.ufc.crateus.sgb.repository.CronogramaRepository;
import br.ufc.crateus.sgb.service.CronogramaService;

/**
 * Controlador Rest para manejar API referentes a entidade Cronograma 
 * @author Leonardo Dutra
 * @see CronogramaRepository 
 * @see CronogramaService
 * @see ICrud
 * @see Cronograma
 */
@RequestMapping("/api/processo/cronograma")
@RestController
public class CronogramaController implements ICrud<Cronograma>{

	@Autowired
	private CronogramaRepository cronogramaRepository;
		
	@Autowired
	private CronogramaService cronogramaService;
	
	@PreAuthorize("hasAuthority('add_cronograma')")
	@PostMapping
	@Override
	public ResponseEntity<Cronograma> add(@RequestBody Cronograma cronograma) {
		cronogramaRepository.save(cronograma);
		return new ResponseEntity<Cronograma>(cronograma,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('edit_cronograma')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Cronograma> update(@RequestBody Cronograma cronograma, @PathVariable long id) {
		if(cronogramaService.isExist(id)) {
			cronograma.setId(id);
			cronogramaRepository.save(cronograma);
			return new ResponseEntity<Cronograma>(cronograma,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Cronograma>(cronograma,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_cronograma')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(cronogramaService.isExist(id)) {
			cronogramaRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_cronograma')")
	@GetMapping
	@Override
	public ResponseEntity<List<Cronograma>> getAll() {
		List<Cronograma> lista = cronogramaRepository.findAll();
		return new ResponseEntity<List<Cronograma>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_cronograma')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Cronograma> getById(@PathVariable long id) {
		Cronograma cronograma = cronogramaRepository.findById(id);
		return new ResponseEntity<Cronograma>(cronograma,HttpStatus.OK);
	}
	
	@PreAuthorize("hasAuthority('view_cronograma')")
	@GetMapping("processo")
	public ResponseEntity<List<Cronograma>> getByProcesso(@RequestParam long id) {
		List<Cronograma> cronograma = cronogramaRepository.findByProcessoId(id);
		return new ResponseEntity<List<Cronograma>>(cronograma,HttpStatus.OK);
	}

}
