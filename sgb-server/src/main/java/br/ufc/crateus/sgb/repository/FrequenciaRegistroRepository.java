package br.ufc.crateus.sgb.repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.FrequenciaRegistro;

/**
 * Repositório CRUD para a entidade FrequenciaRegistro
 * @author Leonardo Dutra
 * @see FrequenciaRegistro
 */
@Repository
public interface FrequenciaRegistroRepository extends JpaRepository<FrequenciaRegistro, Long>{
	
	FrequenciaRegistro findById(long id);
	Optional<FrequenciaRegistro> findById(Long id);
	List<FrequenciaRegistro> findAll();
	List<FrequenciaRegistro> findByProjetoAlunoId(Long id);
	boolean existsById(Long id);
	Optional<FrequenciaRegistro> findByDataReferencia(LocalDate dataReferencia);
	List<FrequenciaRegistro> findByProjetoIdAndAlunoId(Long projetoId, Long aluno);
	List<FrequenciaRegistro> findByProjetoIdAndAlunoIdAndPeriodoRef(Long projetoId, Long alunoId, String periodoRef);
	List<FrequenciaRegistro> findByPeriodoRef(String dataRef);
	
	@Query("SELECT FR FROM FrequenciaRegistro FR WHERE FR.aluno.id = :alunoId AND FR.projeto.id = :projetoId")
	List<FrequenciaRegistro> customPeriodos(Long alunoId, Long projetoId);
	
	@Query("SELECT FR FROM FrequenciaRegistro FR WHERE FR.projeto.id = :projetoId")
	List<FrequenciaRegistro> customPeriodosProjeto(Long projetoId);
	@Query("SELECT DISTINCT(FR) FROM FrequenciaRegistro FR WHERE FR.projeto.id = :projetoId")
	List<FrequenciaRegistro> customPeriodosProjetoDistinct(Long projetoId);
	List<FrequenciaRegistro> findByProjetoIdAndAlunoIdAndMesRefAndAnoRef(Long idProjeto, Long alunoId, Integer mesRef,
			Integer anoRef);
	Optional<FrequenciaRegistro> findByProjetoIdAndAlunoIdAndDiaRefAndMesRefAndAnoRef(Long projetoId, Long alunoId,
			Integer diaRef, Integer mesRef, Integer anoRef);
	List<FrequenciaRegistro> findByProjetoId(Long id);
	
	@Query("SELECT FR FROM FrequenciaRegistro FR WHERE FR.projeto.id = :projetoId AND FR.aluno.id = :aluno AND FR.periodoRef = :periodoRef")
	List<FrequenciaRegistro> findAssinaturasAluno(Long projetoId, Long aluno, String periodoRef);

}
