package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.InscricaoValidacao;

/**
 * Repositório CRUD para a entidade InscricaoValidacao
 * @author Leonardo Dutra
 * @see InscricaoValidacao
 */
@Repository
public interface InscricaoValidacaoRepository extends CrudRepository<InscricaoValidacao, Long>{

	List<InscricaoValidacao> findAll();
	InscricaoValidacao findById(long id);
	InscricaoValidacao findByInscricaoId(long id);
}
