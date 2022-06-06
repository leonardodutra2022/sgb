package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Sistema;

/**
 * Repositório CRUD para a entidade Sistema
 * @author Leonardo Dutra
 * @see Sistema
 */
@Repository
public interface SistemaRepository extends CrudRepository<Sistema, Long>{
		List<Sistema> findAll();
}
