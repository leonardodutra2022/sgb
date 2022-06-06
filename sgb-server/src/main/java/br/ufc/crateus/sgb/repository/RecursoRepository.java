package br.ufc.crateus.sgb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Recurso;

/**
 * Repositório CRUD para a entidade Recurso
 * @author Leonardo Dutra
 * @see Recurso
 */
@Repository
public interface RecursoRepository extends CrudRepository<Recurso, Long>{

	List<Recurso> findAllByOrderByInscricaoId();
	Recurso findById(long id);
	List<Recurso> findByInscricaoId(long inscricao);
	Optional<Recurso> findById(Long id);
	List<Recurso> findByProcessoId(long id);
	List<Recurso> findAll();
	boolean existsByInscricaoId(long id);
}
