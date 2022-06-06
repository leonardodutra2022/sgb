package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.ufc.crateus.sgb.model.Beneficio;

/**
 * Repositório CRUD para a entidade Benefício
 * @author Leonardo Dutra
 * @see Beneficio
 */
public interface BeneficioRepository extends CrudRepository<Beneficio, Long>{
	
	List<Beneficio> findAll();
	Beneficio findById(long id);

}
