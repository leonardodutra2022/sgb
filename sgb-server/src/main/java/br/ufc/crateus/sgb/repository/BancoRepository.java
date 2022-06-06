package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import br.ufc.crateus.sgb.model.Banco;

/**
 * Repositório CRUD para a entidade Banco
 * @author Leonardo Dutra
 * @see Banco
 */
public interface BancoRepository extends CrudRepository<Banco, Long>{
	List<Banco> findAll();
	List<Banco> findAllByOrderByNomeBancoAsc();
	List<Banco> findByCodBanco(String codBanco);
	Banco findById(long id);
}
