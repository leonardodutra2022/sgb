package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Comissao;
import br.ufc.crateus.sgb.repository.ComissaoRepository;

@Service
public class ComissaoService implements IValidation<Comissao>{

	@Autowired
	private ComissaoRepository comissaoRepository;
	
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
		if(comissaoRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Comissao> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
