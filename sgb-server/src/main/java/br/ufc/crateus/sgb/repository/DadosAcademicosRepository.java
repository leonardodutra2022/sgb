package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.DadosAcademicos;

/**
 * Repositório CRUD para a entidade DadosAcademicos
 * @author Leonardo Dutra
 * @see DadosAcademicos
 */
@Repository
public interface DadosAcademicosRepository extends CrudRepository<DadosAcademicos, Long>{

	DadosAcademicos findById(long id);
	List<DadosAcademicos> findAll();
	List<DadosAcademicos> findByAlunoId(long aluno);
	List<DadosAcademicos> findAllByAlunoCpf(String cpf);
	DadosAcademicos findByAlunoCpf(String cpf);
}
