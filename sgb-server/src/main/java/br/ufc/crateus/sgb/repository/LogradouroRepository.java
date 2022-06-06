package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Logradouro;

/**
 * Repositório CRUD para a entidade Logradouro
 * @author Leonardo Dutra
 * @see Logradouro
 */
@Repository
public interface LogradouroRepository extends CrudRepository<Logradouro, Long> {
	
	List<Logradouro> findAll();
	List<Logradouro> findAllByOrderByNomeRuaAsc();
	Logradouro findById(long id);

}
