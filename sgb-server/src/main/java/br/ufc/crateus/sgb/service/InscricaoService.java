package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Inscricao;
import br.ufc.crateus.sgb.repository.InscricaoRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Inscricao
 * @author Leonardo Dutra
 * @see IValidation
 * @see Inscricao
 * @see InscricaoRepository
 */
@Service
public class InscricaoService implements IValidation<Inscricao>{

	@Autowired
	private InscricaoRepository inscricaoRepository;

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
		if(inscricaoRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Inscricao> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}	
}
