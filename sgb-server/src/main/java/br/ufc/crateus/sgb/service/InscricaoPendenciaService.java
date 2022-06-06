package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.InscricaoPendencia;
import br.ufc.crateus.sgb.repository.InscricaoPendenciaRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade InscricaoPendencia
 * @author Leonardo Dutra
 * @see IValidation
 * @see InscricaoPendencia
 * @see InscricaoPendenciaRepository
 */
@Service
public class InscricaoPendenciaService implements IValidation<InscricaoPendencia>{

	@Autowired
	private InscricaoPendenciaRepository inscricaoPendenciaRepository;

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
		if(inscricaoPendenciaRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<InscricaoPendencia> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}	
}
