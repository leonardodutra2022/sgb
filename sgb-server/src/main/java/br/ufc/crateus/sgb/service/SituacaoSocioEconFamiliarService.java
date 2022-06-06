package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.SituacaoSocioEconFamiliar;
import br.ufc.crateus.sgb.repository.SituacaoSocioEconFamiliarRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade SituacaoSocioEconFamiliar
 * @author Leonardo Dutra
 * @see IValidation
 * @see SituacaoSocioEconFamiliar
 * @see SituacaoSocioEconFamiliarRepository
 */
@Service
public class SituacaoSocioEconFamiliarService implements IValidation<SituacaoSocioEconFamiliar>{

	@Autowired
	private SituacaoSocioEconFamiliarRepository socioRepository;
	
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
		if(socioRepository.findById(id) != null)
			return true;
		
		return false;
	}
	
	public boolean isExist(String nomeCompleto, int idade) {
		if(socioRepository.findByNomeCompletoAndIdade(nomeCompleto, idade) != null)
			return true;
		
		return false;
	}
	
	public boolean isExist(String nomeCompleto, int idade, Aluno aluno) {
		if(socioRepository.findByNomeCompletoAndIdadeAndAlunoId(nomeCompleto, idade, aluno.getId()) != null)
			return true;
		
		return false;
	}

	@Override
	public Optional<SituacaoSocioEconFamiliar> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
