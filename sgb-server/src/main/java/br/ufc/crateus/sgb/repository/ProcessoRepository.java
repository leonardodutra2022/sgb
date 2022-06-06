package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Processo;

/**
 * Repositório CRUD para a entidade Processo
 * @author Leonardo Dutra
 * @see Processo
 */
@Repository
public interface ProcessoRepository extends CrudRepository<Processo, Long>{

	List<Processo> findAllByOrderByAtivoDesc();

	Processo findById(long id);
	
	@Query("SELECT p FROM Processo p WHERE ativo = true")
	List<Processo> findByAtivo();
	
	@Query("SELECT p FROM Processo p WHERE unificado = true AND ativo = true")
	List<Processo> findByUnificado();
	
	@Query("SELECT p.id FROM Processo p WHERE p.ano IN (:anos) AND p.beneficio.id IN (:auxilios)")
	List<Long> findByAnoAndAuxilio(List<Integer> anos, List<Long> auxilios);
}
