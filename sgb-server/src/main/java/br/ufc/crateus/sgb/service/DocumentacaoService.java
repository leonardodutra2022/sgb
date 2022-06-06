package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Documentacao;
import br.ufc.crateus.sgb.repository.DocumentacaoRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Documentacao
 * @author Leonardo Dutra
 * @see IValidation
 * @see Documentacao
 * @see DocumentacaoRepository
 */
@Service
public class DocumentacaoService implements IValidation<Documentacao>{

	@Autowired
	private DocumentacaoRepository docRepository;
	
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
		if(docRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Documentacao> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
