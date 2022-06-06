package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Campus;

/**
 * Repositório CRUD para a entidade Campus
 * @author Leonardo Dutra
 * @see Campus
 */
@Repository
public interface CampusRepository extends CrudRepository<Campus, Long>{
	
	List<Campus> findAll();
	Campus findById(long id);

}
