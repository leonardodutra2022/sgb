package br.ufc.crateus.sgb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.Inscricao;
import br.ufc.crateus.sgb.model.enums.StatusEnum;

/**
 * Repositório CRUD para a entidade Inscricao
 * @author Leonardo Dutra
 * @see Inscricao
 */
@Repository
public interface InscricaoRepository extends CrudRepository<Inscricao, Long>{
	
	List<Inscricao> findAll();
	
	Inscricao findById(long id);
	
	Optional<Inscricao> findById(Long id);
	
	Inscricao findByIdAndAlunoSiape(long id, long siape);
	
	Inscricao findByProcessoIdAndAlunoSiape(long id, long matricula);
	
	List<Inscricao> findByAlunoId(long aluno);
	
	@Query("SELECT i FROM Inscricao i WHERE aluno.id = :aluno AND situacao IN (:situacao)")
	List<Inscricao> findAlunoSituacao(long aluno, List<StatusEnum> situacao);
	
	List<Inscricao> findByProcessoId(long id);
	
	@Query("SELECT i FROM Inscricao i WHERE processo.id = :id AND situacao <> 'INSCRICAO_CANCELADA' OR situacao IS NULL")
	List<Inscricao> findCustom(long id);
	
	@Query("SELECT i FROM Inscricao i WHERE i.id = :id")
	List<Inscricao> getInfoMoradiaTransporte(long id);
	
	Inscricao findByAlunoIdAndProcessoId(long alunoId, long processoId);
	
	@Query("SELECT i FROM Inscricao i WHERE i.processo.id = :id AND i.situacao IN ('INSCRITO', 'DEFERIDO', 'INDEFERIDO', 'EM_ANALISE') ORDER BY i.aluno.nomeCompleto ASC")
	List<Inscricao> findCustomInscricoes(long id);
	
	@Query("SELECT a.siape FROM Aluno a, Inscricao i, Processo p WHERE a.id = i.aluno.id AND p.id = i.processo.id AND i.situacaoFinal IN ('DEFERIDO') AND p.id IN :processos")
	List<Long> abbleQuery(List<Long> processos);
}
