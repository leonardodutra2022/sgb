package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Concessao;

/**
 * Repositório CRUD para a entidade Concessao
 * @author Leonardo Dutra
 * @see Concessao
 */
@Repository
public interface ConcessaoRepository extends CrudRepository<Concessao, Long> {
		List<Concessao> findAll();
		Concessao findById(long id);
		List<Concessao> findAllByAlunoCpf(String cpf);
		Concessao findByAlunoIdAndProcessoId(long aluno, long processo);
		List<Concessao> findAllByAlunoId(Long id);
}
