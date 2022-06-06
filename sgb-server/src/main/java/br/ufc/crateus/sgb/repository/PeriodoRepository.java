package br.ufc.crateus.sgb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Periodo;

/**
 * Repositório CRUD para a entidade Período
 * @author Leonardo Dutra
 * @see Periodo
 */
@Repository
public interface PeriodoRepository extends CrudRepository<Periodo, Long>{
	
	Periodo findById(long id);
	Optional<Periodo> findById(Long id);
	List<Periodo> findAll();

}
