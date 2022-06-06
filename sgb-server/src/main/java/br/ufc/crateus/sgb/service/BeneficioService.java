package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Beneficio;
import br.ufc.crateus.sgb.repository.BeneficioRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Beneficio
 * @author Leonardo Dutra
 * @see IValidation
 * @see Beneficio
 * @see BeneficioRepository
 */
@Service
public class BeneficioService implements IValidation<Beneficio>{

	@Autowired
	private BeneficioRepository beneficioRepository;
	
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
		if(beneficioRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Beneficio> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
