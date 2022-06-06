package br.ufc.crateus.sgb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.interfaces.IList;
import br.ufc.crateus.sgb.model.LogradouroTipo;
import br.ufc.crateus.sgb.repository.LogradouroTipoRepository;

/**
 * Controlador Rest para manejar API referentes a entidade LogradouroTipo 
 * @author Leonardo Dutra
 * @see IList
 * @see LogradouroTipo
 * @see LogradouroTipoRepository
 */
@RestController
@RequestMapping("/api/logradouro/tipo")
public class LogradouroTipoController implements IList<LogradouroTipo>{

	@Autowired
	private LogradouroTipoRepository logradouroTipoRepository;
	
	@GetMapping
	@Override
	public List<LogradouroTipo> getAll() {
		return logradouroTipoRepository.findAllByOrderByDescricaoAsc();
	}

	@GetMapping("/search")
	@Override
	public List<LogradouroTipo> getBySigla(@RequestParam String abreviatura) {
		return logradouroTipoRepository.findByAbreviatura(abreviatura);
	}

	@GetMapping(value="{id}")
	@Override
	public LogradouroTipo getById(@PathVariable long id) {
		return logradouroTipoRepository.findById(id);
	}
}
