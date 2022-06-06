package br.ufc.crateus.sgb.repository.custom;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Projeto;
import br.ufc.crateus.sgb.model.QProjeto;
import br.ufc.crateus.sgb.model.Usuario;
import br.ufc.crateus.sgb.utils.WhereBooleanBuilder;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import com.querydsl.jpa.impl.JPAQueryFactory;

@Repository
public class ProjetoCustomRepository {

	@PersistenceContext
	private EntityManager entityManager;
	
	public List<Projeto> findAdvancedHQL(Long projeto, Long aluno, Long responsavel){
		
		String query = "select P from Projeto as P";
		String condition = "where";
		
		if(projeto != null) {
			query += condition + "P.id = :projetoId";
			condition = " and ";
		}
		
		if(aluno != null) {
			query += condition + "P.aluno.id = :alunoId";
			condition = " and ";
		}
		
		if(responsavel != null) {
			query += condition + "P.responsavel.id = :responsavelId";
			condition = " and ";
		}
		
		return new ArrayList<Projeto>();
		
	}
	
	
	@SuppressWarnings("unchecked")
	public List<Projeto> findAdvancedDSL(Projeto projeto, Aluno aluno, Usuario responsavel){
			
			QProjeto proj = QProjeto.projeto;
			
			JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
			
			List<Projeto> resultList = queryFactory.selectFrom(proj)
					.where(
						new WhereBooleanBuilder()
							.optionalAnd(projeto, ()-> proj.eq(projeto))
							.optionalAnd(aluno, ()-> proj.aluno.contains(aluno)) 
							.optionalAnd(responsavel, ()-> proj.responsavel.eq(responsavel))
					)
					.createQuery().getResultList();
			
			return resultList;
			
		}
		
	
}
