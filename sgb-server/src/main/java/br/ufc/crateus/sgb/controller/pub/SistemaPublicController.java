package br.ufc.crateus.sgb.controller.pub;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
@RequestMapping("/public/api/sistema")
@RestController
public class SistemaPublicController {

	@Autowired
	private SistemaRepository sistemaRepository;
	
	@GetMapping
	public ResponseEntity<Sistema> sistema() {
		
		List<Sistema> lista = sistemaRepository.findAll();
		
		for(Sistema s : lista) {
			if(s.isManutencao()) {
				return new ResponseEntity<Sistema>(s,HttpStatus.OK);				
			}else {
				return new ResponseEntity<Sistema>(s,HttpStatus.OK);
			}
		}
		return new ResponseEntity<Sistema>(new Sistema(),HttpStatus.NO_CONTENT);

	}
}
