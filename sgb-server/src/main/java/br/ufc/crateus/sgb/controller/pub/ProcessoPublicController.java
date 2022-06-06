package br.ufc.crateus.sgb.controller.pub;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.model.Processo;
import br.ufc.crateus.sgb.repository.ProcessoRepository;

/**
 * Controlador Rest Público para manejar API referentes a entidade Processo 
 * @author Leonardo Dutra
 * @see ProcessoRepository
 * @see Processo
 */
@RequestMapping("/public/api/processo")
@RestController
public class ProcessoPublicController {

	@Autowired
	private ProcessoRepository processoRepository;
	
	@GetMapping
	public ResponseEntity<List<Processo>> getAll() {
		List<Processo> lista = processoRepository.findByAtivo();
		return new ResponseEntity<List<Processo>>(lista,HttpStatus.OK);
	}

	@GetMapping(value="{id}")
	public ResponseEntity<Processo> getById(@PathVariable long id) {
		Processo processo = processoRepository.findById(id);
		return new ResponseEntity<Processo>(processo,HttpStatus.OK);
	}

}
