package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Cidade;

/**
 * Repositório CRUD para a entidade Cidade
 * @author Leonardo Dutra
 * @see Cidade
 */
@Repository
public interface CidadeRepository extends CrudRepository<Cidade, Long>{
	List<Cidade> findAll();
	List<Cidade> findAllByOrderByNomeAsc();
	List<Cidade> findByUf(String uf);
	Cidade findById(long id);
}
