package br.ufc.crateus.sgb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.ufc.crateus.sgb.interfaces.IList;
import br.ufc.crateus.sgb.model.Estado;
import br.ufc.crateus.sgb.model.Notificacao;
import br.ufc.crateus.sgb.repository.EstadoRepository;
import br.ufc.crateus.sgb.repository.NotificacaoRepository;

/**
 * Controlador Rest para manejar API referentes a entidade Estado 
 * @author Leonardo Dutra
 * @see EstadoRepository
 * @see IList
 * @see Estado
 */
@RestController
@RequestMapping("/api/notificacao")
public class NotificacaoController{
	
	@Autowired
	private NotificacaoRepository notificacaoRepository;

	@GetMapping
	public List<Notificacao> getAll() {
		return notificacaoRepository.findAll();
	}

	@GetMapping(value="{id}")
	public Notificacao getById(@PathVariable long id) {
		return notificacaoRepository.findById(id);
	}

}
