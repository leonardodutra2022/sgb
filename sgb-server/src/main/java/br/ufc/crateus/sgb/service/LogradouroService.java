package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Logradouro;
import br.ufc.crateus.sgb.repository.LogradouroRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Logradouro
 * @author Leonardo Dutra
 * @see IValidation
 * @see Logradouro
 * @see LogradouroRepository
 */
@Service
public class LogradouroService implements IValidation<Logradouro>{

	@Autowired
	private LogradouroRepository logradouroRepository;
	
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
		if(logradouroRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Logradouro> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
