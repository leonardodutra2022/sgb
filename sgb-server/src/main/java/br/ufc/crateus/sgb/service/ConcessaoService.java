package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Concessao;
import br.ufc.crateus.sgb.repository.ConcessaoRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Concessao
 * @author Leonardo Dutra
 * @see IValidation
 * @see Concessao
 * @see ConcessaoRepository
 */
@Service
public class ConcessaoService implements IValidation<Concessao>{

	@Autowired
	private ConcessaoRepository concessoes;
	
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
		if(concessoes.findById(id) != null)
			return true;
		
		return false;
	}
	
	public boolean hasConcessao(long aluno, long processo) {
		Concessao c = this.concessoes.findByAlunoIdAndProcessoId(aluno, processo);

		if(c != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<Concessao> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
