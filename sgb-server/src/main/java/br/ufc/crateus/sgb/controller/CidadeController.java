package br.ufc.crateus.sgb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.interfaces.IList;
import br.ufc.crateus.sgb.model.Cidade;
import br.ufc.crateus.sgb.repository.CidadeRepository;

/**
 * Controlador Rest para manejar API referentes a entidade Cidade 
 * @author Leonardo Dutra
 * @see IList
 * @see Cidade
 * @see CidadeRepository
 */
@RestController
@RequestMapping("/api/cidade")
public class CidadeController implements IList<Cidade>{
	
	@Autowired
	private CidadeRepository cidadeRepository;

	@GetMapping
	@Override
	public List<Cidade> getAll() {
		return cidadeRepository.findAllByOrderByNomeAsc();
	}

	@GetMapping("/search")
	@Override
	public List<Cidade> getBySigla(@RequestParam String uf) {
		return cidadeRepository.findByUf(uf);
	}

	@GetMapping(value="{id}")
	@Override
	public Cidade getById(@PathVariable long id) {
		return cidadeRepository.findById(id);
	}

}
