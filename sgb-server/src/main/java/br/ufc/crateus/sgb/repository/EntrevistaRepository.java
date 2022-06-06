package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Entrevista;

/**
 * Repositório CRUD para a entidade Entrevista
 * @author Leonardo Dutra
 * @see Entrevista
 */
@Repository
public interface EntrevistaRepository extends CrudRepository<Entrevista, Long>{

	List<Entrevista> findAll();
	Entrevista findById(long id);
	Entrevista findByInscricaoId(long inscricao);
}
