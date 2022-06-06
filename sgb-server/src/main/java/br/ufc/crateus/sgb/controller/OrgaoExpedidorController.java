package br.ufc.crateus.sgb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.interfaces.IList;
import br.ufc.crateus.sgb.model.OrgaoExpedidor;
import br.ufc.crateus.sgb.repository.OrgaoExpedidorRepository;

/**
 * Controlador Rest para manejar API referentes a entidade OrgaoExpedidor 
 * @author Leonardo Dutra
 * @see IList
 * @see OrgaoExpedidor
 * @see OrgaoExpedidorRepository
 */
@RestController
@RequestMapping("/api/orgaoexpedidor")
public class OrgaoExpedidorController implements IList<OrgaoExpedidor>{
	
	@Autowired
	private OrgaoExpedidorRepository orgaoExpedidorRepository;

	@GetMapping
	@Override
	public List<OrgaoExpedidor> getAll() {
		return orgaoExpedidorRepository.findAllByOrderByDescricaoAsc();
	}

	@GetMapping("/search")
	@Override
	public List<OrgaoExpedidor> getBySigla(@RequestParam String sigla) {
		return orgaoExpedidorRepository.findBySigla(sigla);
	}

	@GetMapping(value="{id}")
	@Override
	public OrgaoExpedidor getById(@PathVariable long id) {
		return orgaoExpedidorRepository.findById(id);
	}

}
