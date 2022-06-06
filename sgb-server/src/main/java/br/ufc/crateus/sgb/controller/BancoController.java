package br.ufc.crateus.sgb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.interfaces.IList;
import br.ufc.crateus.sgb.model.Banco;
import br.ufc.crateus.sgb.repository.BancoRepository;

/**
 * Controlador Rest para manejar API referentes a entidade Banco 
 * @author Leonardo Dutra
 * @see IList
 * @see BancoRepository
 * @see Banco
 */
@RestController
@RequestMapping("/api/banco")
public class BancoController implements IList<Banco>{
	
	@Autowired
	private BancoRepository bancoRepository;

	@GetMapping
	@Override
	public List<Banco> getAll() {
		return bancoRepository.findAllByOrderByNomeBancoAsc();
	}

	@GetMapping("/search")
	@Override
	public List<Banco> getBySigla(@RequestParam String cod) {
		return bancoRepository.findByCodBanco(cod);
	}

	@GetMapping(value="{id}")
	@Override
	public Banco getById(@PathVariable long id) {
		return bancoRepository.findById(id);
	}

}
