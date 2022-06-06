package br.ufc.crateus.sgb.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ufc.crateus.sgb.exception.ApiError;
import br.ufc.crateus.sgb.interfaces.IValidation;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.repository.AlunoRepository;
import br.ufc.crateus.sgb.utils.CpfCnpjUtils;

/**
 * Serviço com procedimentos validatórios ou comuns referentes a entidade Aluno
 * @author Leonardo Dutra
 * @see IValidation
 * @see Aluno
 * @see AlunoRepository
 */
@Service
public class AlunoService implements IValidation<Aluno>{
	
	@Autowired
	private AlunoRepository alunoRepository;

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
		if(alunoRepository.findById(id) != null)
			return true;
		
		return false;
	}
	
	public Map<Boolean, ApiError> isExist(Aluno aluno) {
		return checkAluno(aluno);
	}
	
	private Map<Boolean, ApiError> checkAluno(Aluno aluno){
		
		boolean findAluno = false;
		boolean invalidAluno = false;
		Optional<Aluno> temp = Optional.empty();
		Map<Boolean, ApiError> retorno = new HashMap<Boolean, ApiError>();
		
		if(!this.cpfValid(aluno.getCpf() == null ? "" : aluno.getCpf())) {
			invalidAluno = true;
			retorno.put(true, new ApiError(400, "CPF Inválido", "CPF não possui o formato válido"));
			return retorno;
		}
		
		temp = Optional.ofNullable(this.alunoRepository.findByCpf(aluno.getCpf()));
		if(temp.isPresent()) {
			findAluno = true;
			retorno.put(true, new ApiError(400, "Registro com CPF já existente", "CPF já existente, reveja o valor informado"));
			return retorno;
		}
		
		// matrícula
		temp = Optional.ofNullable(this.alunoRepository.findBySiape(aluno.getSiape()));
		if(temp.isPresent()) {
			findAluno = true;
			retorno.put(true, new ApiError(400, "Matrícula Já Existente", "Matrícula informada já existe"));
			return retorno;
		}
		
		// e-mail
		temp = this.alunoRepository.findByEmail(aluno.getEmail());
		if(temp.isPresent()) {
			findAluno = true;
			retorno.put(true, new ApiError(400, "E-mail Existente", "E-mail informado já existe"));
			return retorno;
		}
		
		retorno.put(false, null);
		return retorno;
	}

	private boolean cpfValid(String cpf) {
		return CpfCnpjUtils.isValid(cpf);
	}

	@Override
	public Optional<Aluno> getById(long id) {
		Optional<Aluno> alunoFind = Optional.ofNullable(this.alunoRepository.findById(id));
		if(alunoFind.isPresent()) {
			return Optional.ofNullable(alunoFind.get());
		}
		return Optional.empty();
	}

}
