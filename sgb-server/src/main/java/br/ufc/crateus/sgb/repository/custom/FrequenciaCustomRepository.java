package br.ufc.crateus.sgb.repository.custom;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Periodo;
import br.ufc.crateus.sgb.model.Projeto;
import br.ufc.crateus.sgb.model.QProjeto;
import br.ufc.crateus.sgb.model.Usuario;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class FrequenciaCustomRepository {

	@PersistenceContext
	private EntityManager entityManager;
	
	public List<?> findAdvancedHQL(Long periodo, Long projeto, Long aluno, Long responsavel){
		
		String query = "select F from Frequencia as F";
		String condition = "where";
		
		if(periodo != null) {
			query += condition + "F.periodo.id = :periodoId";
			condition = " and ";
		}
		
		if(projeto != null) {
			query += condition + "F.projeto.id = :projetoId";
			condition = " and ";
		}
		
		if(aluno != null) {
			query += condition + "F.projeto.aluno.id = :alunoId";
			condition = " and ";
		}
		
		if(responsavel != null) {
			query += condition + "F.responsavel.id = :responsavelId";
			condition = " and ";
		}
		
		return new ArrayList<>();
		
	}
	
	
	@SuppressWarnings("unchecked")
	public List<?> findAdvancedDSL(Periodo periodo, Projeto projeto, Aluno aluno, Usuario responsavel){
			
//			.optionalAnd(periodo, ()-> frequencia.periodo.like("%"+nome+"%"))
		
//			QFrequencia frequencia = QFrequencia.frequencia;
		
		Object frequencia;
			
			QProjeto proj = QProjeto.projeto;
			
			JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
			
//			List<?> resultList = queryFactory.selectFrom(frequencia)
//					.where(
//						new WhereBooleanBuilder()
//							.optionalAnd(periodo, ()-> frequencia.periodo.eq(periodo))						
//							.optionalAnd(projeto, ()-> frequencia.projeto.eq(projeto))
//							.optionalAnd(aluno, ()-> frequencia.projeto.aluno.contains(aluno)) 
//							.optionalAnd(responsavel, ()-> proj.responsavel.eq(responsavel))
//					)
//					.createQuery().getResultList();
			
//			return resultList;
			return new ArrayList<>();
			
		}
		
	
}
