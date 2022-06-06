package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Documentacao;

/**
 * Repositório CRUD para a entidade Documentacao
 * @author Leonardo Dutra
 * @see Documentacao
 */
@Repository
public interface DocumentacaoRepository extends CrudRepository<Documentacao, Long>{
	
	Documentacao findById(long id);
	List<Documentacao> findAllByOrderByDocumentoAsc();	
	@Query("SELECT d1 FROM Documentacao d1 WHERE d1.documentoTipo IN ('EDITAL','ADITIVO_EDITAL','PORTARIA')")
	List<Documentacao> findAllByDocumentoTipo();	
	Documentacao findByDocumento(String docTipo);
	List<Documentacao> findAll();
	@Query("SELECT d1 FROM Documentacao d1 WHERE d1.ativo = true ORDER BY d1.documento ASC")
	List<Documentacao> findAllByAtivoByOrderByDocumentoAsc();
	@Query("SELECT d1 FROM Documentacao d1 WHERE d1.ativo = true ORDER BY d1.sequencia ASC")
	List<Documentacao> findAllByAtivoByOrderBySequenciaAsc();
	@Query("SELECT DISTINCT(grupoDoc) FROM Documentacao d1 ORDER BY d1.grupoDoc ASC")
	List<Documentacao> findAllGrupoDoc();
}
