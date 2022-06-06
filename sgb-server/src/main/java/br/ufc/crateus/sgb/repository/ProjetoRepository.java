package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Projeto;

/**
 * Repositório CRUD para a entidade Projeto
 * @author Leonardo Dutra
 * @see Projeto
 */
@Repository
public interface ProjetoRepository extends JpaRepository<Projeto, Long>{

	Projeto findById(long id);
	boolean existsById(long id);
	List<Projeto> findByResponsavelId(Long id);
	List<Projeto> findByResponsavelSiape(Long siape);
	List<Projeto> findByAlunoId(Long alunoId);
}
