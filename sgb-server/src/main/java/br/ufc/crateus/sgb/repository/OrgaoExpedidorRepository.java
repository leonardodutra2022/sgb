package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.OrgaoExpedidor;

/**
 * Repositório CRUD para a entidade OrgaoExpedidor
 * @author Leonardo Dutra
 * @see OrgaoExpedidor
 */
@Repository
public interface OrgaoExpedidorRepository extends CrudRepository<OrgaoExpedidor, Long>{
	
	List<OrgaoExpedidor> findAll();
	List<OrgaoExpedidor> findAllByOrderByDescricaoAsc();
	List<OrgaoExpedidor> findBySigla(String sigla);
	OrgaoExpedidor findById(long id);
}
