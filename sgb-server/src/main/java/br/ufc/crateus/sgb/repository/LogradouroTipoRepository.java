package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.LogradouroTipo;

/**
 * Repositório CRUD para a entidade LogradouroTipo
 * @author Leonardo Dutra
 * @see LogradouroTipo
 */
@Repository
public interface LogradouroTipoRepository extends CrudRepository<LogradouroTipo, Long>{
	List<LogradouroTipo> findAll();
	List<LogradouroTipo> findAllByOrderByDescricaoAsc();
	List<LogradouroTipo> findByAbreviatura(String abreviatura);
	LogradouroTipo findById(long id);
}
