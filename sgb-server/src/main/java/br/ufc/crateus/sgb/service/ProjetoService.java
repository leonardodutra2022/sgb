package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Projeto;
import br.ufc.crateus.sgb.repository.ProjetoRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Projeto
 * @author Leonardo Dutra
 * @see IValidation
 * @see Projeto
 * @see ProjetoRepository
 */
@Service
public class ProjetoService implements IValidation<Projeto>{
	
	@Autowired
	private ProjetoRepository projetoRepository;

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
		if(projetoRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Projeto> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
