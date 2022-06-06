package br.ufc.crateus.sgb.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.DadosAcademicos;
import br.ufc.crateus.sgb.repository.DadosAcademicosRepository;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade DadosAcademicos
 * @author Leonardo Dutra
 * @see IValidation
 * @see DadosAcademicos
 * @see DadosAcademicosRepository
 */
@Service
public class DadosAcademicosService implements IValidation<DadosAcademicos>{

	@Autowired
	private DadosAcademicosRepository dadosAcadRepository;
	
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
		if(dadosAcadRepository.findById(id) != null)
			return true;
		
		return false;
	}
	
	public boolean isExistByAluno(long id) {
		if(dadosAcadRepository.findByAlunoId(id)!=null) {
			return true;
		}
		return false;
	}

	@Override
	public Optional<DadosAcademicos> getById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
