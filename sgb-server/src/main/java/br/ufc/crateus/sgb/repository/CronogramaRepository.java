package br.ufc.crateus.sgb.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Cronograma;

/**
 * Repositório CRUD para a entidade Cronograma
 * @author Leonardo Dutra
 * @see Cronograma
 */
@Repository
public interface CronogramaRepository extends CrudRepository<Cronograma, Long>{

	List<Cronograma> findAll();
	Cronograma findById(long id);
	List<Cronograma> findByProcessoId(long id);
	@Query("SELECT c FROM Cronograma c WHERE date(:dataAtual) BETWEEN date(dataInicio) AND date(dataFim) AND processo.id = :processo")
	List<Cronograma> find(LocalDate dataAtual, long processo);

}
