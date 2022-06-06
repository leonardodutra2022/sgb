package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Processo;
import br.ufc.crateus.sgb.repository.ProcessoRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Processo
 * @author Leonardo Dutra
 * @see IValidation
 * @see Processo
 * @see ProcessoRepository
 */
@Service
public class ProcessoService implements IValidation<Processo>{

	@Autowired
	private ProcessoRepository processoRepository;
	
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
		if(processoRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Processo> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
