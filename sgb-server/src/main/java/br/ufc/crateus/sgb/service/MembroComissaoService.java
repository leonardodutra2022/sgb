package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.MembroComissao;
import br.ufc.crateus.sgb.repository.MembroComissaoRepository;

@Service
public class MembroComissaoService implements IValidation<MembroComissao>{

	@Autowired
	private MembroComissaoRepository membroRepository;
	
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
		if(membroRepository.findById(id) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<MembroComissao> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
