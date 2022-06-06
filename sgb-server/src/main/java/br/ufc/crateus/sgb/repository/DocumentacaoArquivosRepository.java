package br.ufc.crateus.sgb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.DocumentacaoArquivos;

/**
 * Repositório CRUD para a entidade DocumentacaoArquivos
 * @author Leonardo Dutra
 * @see DocumentacaoArquivos
 */
@Repository
public interface DocumentacaoArquivosRepository extends CrudRepository<DocumentacaoArquivos, Long>{
	
	List<DocumentacaoArquivos> findAll();
	

//	@Query("SELECT d, p FROM DocumentacaoArquivos d, Processo p WHERE d.documentacao.documentoTipo "
//			+ "IN ('EDITAL', 'ADITIVO_EDITAL', 'PORTARIA')")
	@Query("SELECT d FROM DocumentacaoArquivos d WHERE d.documentacao.documentoTipo "
	+ "IN ('EDITAL', 'ADITIVO_EDITAL', 'PORTARIA')")
	List<DocumentacaoArquivos> findDocs();
	
	@Query("SELECT d FROM DocumentacaoArquivos d WHERE d.documentacao.documentoTipo "
	+ "IN ('EDITAL', 'ADITIVO_EDITAL', 'PORTARIA', 'CRONOGRAMA') AND d.processo.id = :processo")
	List<DocumentacaoArquivos> findDocsByProcesso(long processo);
	
	List<DocumentacaoArquivos> findByProcessoIdAndParaProcessoTrue(long processo);
	
	@Query("SELECT d FROM DocumentacaoArquivos d WHERE d.paraProcesso = 1 AND d.processo.id = :processo")
	List<DocumentacaoArquivos> findDocsOficiaisByProcesso(long processo);
	
	DocumentacaoArquivos findById(long id);
	DocumentacaoArquivos findByInscricaoIdAndDocumentacaoDocumento(long inscricao, String documento);
	List<DocumentacaoArquivos> findByProcessoIdAndDocumentacaoDocumentoTipo(long processo, String docTipo);
	
	boolean existsByNomeArquivoAndInscricaoId(String nomeArquivo, long inscricao);
	boolean existsByNomeArquivoAndProcessoId(String nomeArquivo, long processo);
	boolean existsByInscricaoIdAndProcessoIdAndDocTipo(long inscricao, long processo, String docTipo);

	List<DocumentacaoArquivos> findByInscricaoId(long id);
	
	@Query("SELECT count(*) FROM DocumentacaoArquivos d WHERE d.paraRecurso = 1 AND d.processo.id = :processo AND d.inscricao.id = :inscricao AND d.docTipo = :docTipo")
	long countCustom(long inscricao, long processo, String docTipo);

	List<DocumentacaoArquivos> findByNomeArquivo(String fileName);

	@Query("SELECT d FROM DocumentacaoArquivos d WHERE d.paraInscricao = 1 AND d.processo.id in(:codProcessos)")
	List<DocumentacaoArquivos> findByProcessos(List<Long> codProcessos);
}
