package br.ufc.crateus.sgb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.interfaces.IList;
import br.ufc.crateus.sgb.model.Estado;
import br.ufc.crateus.sgb.repository.EstadoRepository;

/**
 * Controlador Rest para manejar API referentes a entidade Estado 
 * @author Leonardo Dutra
 * @see EstadoRepository
 * @see IList
 * @see Estado
 */
@RestController
@RequestMapping("/api/estado")
public class EstadoController implements IList<Estado>{
	
	@Autowired
	private EstadoRepository estadoRepository;

	@GetMapping
	@Override
	public List<Estado> getAll() {
		return estadoRepository.findAllByOrderByNomeAsc();
	}

	@GetMapping("/search")
	@Override
	public List<Estado> getBySigla(@RequestParam String sigla) {
		return estadoRepository.findBySigla(sigla);
	}

	@GetMapping(value="{id}")
	@Override
	public Estado getById(@PathVariable long id) {
		return estadoRepository.findById(id);
	}

}
