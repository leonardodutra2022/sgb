package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Entrevista;
import br.ufc.crateus.sgb.repository.EntrevistaRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Entrevista
 * @author Leonardo Dutra
 * @see IValidation
 * @see Entrevista
 * @see EntrevistaRepository
 */
@Service
public class EntrevistaService implements IValidation<Entrevista>{

	@Autowired
	private EntrevistaRepository entrevistaRepository;
	
	@Override
	public boolean verifyFormat() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean verifySize() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isNull() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isExist(long id) {
		if(entrevistaRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Entrevista> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
