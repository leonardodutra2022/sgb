package br.ufc.crateus.sgb.controller;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.model.Sistema;
import br.ufc.crateus.sgb.repository.SistemaRepository;

/**
 * Controlador Rest para manejar API referentes a entidade Sistema 
 * @author Leonardo Dutra
 * @see SistemaRepository
 * @see Sistema
 */
@RequestMapping("/api/sistema")
@RestController
public class SistemaController {

	@Autowired
	private SistemaRepository sistemaRepository;
	
	@PutMapping(value="{id}")
	public ResponseEntity<Sistema> update(@RequestBody Sistema sistema, @PathVariable long id) {
		if(sistemaRepository.existsById(id)) {
			sistema.setId(id);
			sistema.setDataHora(new Date());
			sistemaRepository.save(sistema);
			return new ResponseEntity<Sistema>(sistema,HttpStatus.OK);
		} 
		
		return new ResponseEntity<Sistema>(sistema,HttpStatus.NOT_FOUND);
	}
}
