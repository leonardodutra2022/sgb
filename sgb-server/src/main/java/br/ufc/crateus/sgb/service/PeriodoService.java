package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Periodo;
import br.ufc.crateus.sgb.repository.PeriodoRepository;


/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Periodo
 * @author Leonardo Dutra
 * @see IValidation
 * @see Periodo
 * @see PeriodoRepository
 */
@Service
public class PeriodoService implements IValidation<Periodo>{
	
	@Autowired
	private PeriodoRepository periodoRepository;
	
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
		if(periodoRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Periodo> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}
}
