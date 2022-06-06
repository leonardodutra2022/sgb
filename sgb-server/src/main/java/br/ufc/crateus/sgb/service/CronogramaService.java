package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Cronograma;
import br.ufc.crateus.sgb.repository.CronogramaRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Cronograma
 * @author Leonardo Dutra
 * @see IValidation
 * @see Cronograma
 * @see CronogramaRepository
 */
@Service
public class CronogramaService implements IValidation<Cronograma>{

	@Autowired
	private CronogramaRepository cronogramaRepository;
	
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
		if(cronogramaRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Cronograma> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
