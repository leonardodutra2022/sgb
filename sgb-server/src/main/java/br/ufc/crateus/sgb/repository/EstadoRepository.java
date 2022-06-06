package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Estado;

/**
 * Repositório CRUD para a entidade Estado
 * @author Leonardo Dutra
 * @see Estado
 */
@Repository
public interface EstadoRepository extends CrudRepository<Estado, Long>{
	List<Estado> findAll();
	List<Estado> findAllByOrderByNomeAsc();
	List<Estado> findBySigla(String sigla);
	Estado findById(long id);
}
