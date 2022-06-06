package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Recurso;
import br.ufc.crateus.sgb.repository.RecursoRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Recurso
 * @author Leonardo Dutra
 * @see IValidation
 * @see Recurso
 * @see RecursoRepository
 */
@Service
public class RecursoService implements IValidation<Recurso>{

	@Autowired
	private RecursoRepository recursoRepository;
	
	@Override
	public boolean verifyFormat() {
		return false;
	}

	@Override
	public boolean verifySize() {
		return false;
	}

	@Override
	public boolean isNull() {
		return false;
	}

	@Override
	public boolean isExist(long id) {
		if(recursoRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Recurso> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
