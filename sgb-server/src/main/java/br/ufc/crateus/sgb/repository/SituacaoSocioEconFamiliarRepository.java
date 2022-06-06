package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.SituacaoSocioEconFamiliar;

/**
 * Repositório CRUD para a entidade SituacaoSocioEconFamiliar
 * @author Leonardo Dutra
 * @see SituacaoSocioEconFamiliar
 */
@Repository
public interface SituacaoSocioEconFamiliarRepository extends CrudRepository<SituacaoSocioEconFamiliar, Long>{
	
	List<SituacaoSocioEconFamiliar> findAll();
	SituacaoSocioEconFamiliar findById(long id);
	SituacaoSocioEconFamiliar findByNomeCompletoAndIdade(String nomeCompleto, int idade);
	SituacaoSocioEconFamiliar findByNomeCompletoAndIdadeAndAlunoId(String nomeCompleto, int idade, long id);
	List<SituacaoSocioEconFamiliar> findByAlunoId(long id);

}
