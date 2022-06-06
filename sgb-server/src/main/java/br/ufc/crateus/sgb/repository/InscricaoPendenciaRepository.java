package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.InscricaoPendencia;
import br.ufc.crateus.sgb.model.enums.PendenciaEnum;

/**
 * Repositório CRUD para a entidade InscricaoPendencia
 * @author Leonardo Dutra
 * @see InscricaoPendencia
 */
@Repository
public interface InscricaoPendenciaRepository extends CrudRepository<InscricaoPendencia, Long>{
	
	List<InscricaoPendencia> findAll();
	InscricaoPendencia findById(long id);
	List<InscricaoPendencia> findByInscricaoIdAndConcluido(long id, boolean concluido);
	InscricaoPendencia findByInscricaoIdAndConcluidoAndPendencia(long idInscricao, boolean b, PendenciaEnum form);
	InscricaoPendencia findByInscricaoId(long id);
}
