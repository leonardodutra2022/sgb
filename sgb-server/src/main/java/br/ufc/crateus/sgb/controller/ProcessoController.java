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
import br.ufc.crateus.sgb.model.Processo;
import br.ufc.crateus.sgb.repository.ProcessoRepository;
import br.ufc.crateus.sgb.service.ProcessoService;

/**
 * Controlador Rest para manejar API referentes a entidade Processo 
 * @author Leonardo Dutra
 * @see ICrud
 * @see Processo
 * @see ProcessoRepository
 * @see ProcessoService
 */
@RequestMapping("/api/processo")
@RestController
public class ProcessoController implements ICrud<Processo> {

	@Autowired
	private ProcessoRepository processoRepository;
	
	@Autowired
	private ProcessoService processoService;
	
	@PreAuthorize("hasAuthority('add_processo')")
	@PostMapping
	@Override
	public ResponseEntity<Processo> add(@RequestBody Processo processo) {
		processoRepository.save(processo);
		return new ResponseEntity<Processo>(processo,HttpStatus.OK);
	}


	@PreAuthorize("hasAuthority('edit_processo')")
	@PutMapping(value="{id}")
	@Override
	public ResponseEntity<Processo> update(@RequestBody Processo processo, @PathVariable long id) {
		if(processoService.isExist(id)) {
			processo.setId(id);
			processoRepository.save(processo);
			return new ResponseEntity<Processo>(processo,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Processo>(processo,HttpStatus.NOT_FOUND);
	}

	@PreAuthorize("hasAuthority('delete_processo')")
	@DeleteMapping(value="{id}")
	@Override
	public void delete(@PathVariable long id) {
		if(processoService.isExist(id)) {
			processoRepository.deleteById(id);			
		}
	}

	@PreAuthorize("hasAuthority('view_processo')")
	@GetMapping
	@Override
	public ResponseEntity<List<Processo>> getAll() {
		List<Processo> lista = processoRepository.findAllByOrderByAtivoDesc();
		return new ResponseEntity<List<Processo>>(lista,HttpStatus.OK);
	}

	@PreAuthorize("hasAuthority('view_processo')")
	@GetMapping(value="{id}")
	@Override
	public ResponseEntity<Processo> getById(@PathVariable long id) {
		Processo processo = processoRepository.findById(id);
		return new ResponseEntity<Processo>(processo,HttpStatus.OK);
	}

}
