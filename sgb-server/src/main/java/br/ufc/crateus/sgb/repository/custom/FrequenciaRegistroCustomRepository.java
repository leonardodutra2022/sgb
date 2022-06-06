package br.ufc.crateus.sgb.repository.custom;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;

import javax.persistence.EntityManager;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Repository;

import br.ufc.crateus.sgb.model.FrequenciaRegistro;
import br.ufc.crateus.sgb.model.Horario;
import br.ufc.crateus.sgb.model.page.FrequenciaRegistroPage;
import br.ufc.crateus.sgb.model.page.criteria.FrequenciaRegistroCriteria;

@Repository
public class FrequenciaRegistroCustomRepository {

	private final EntityManager entityManager;
	private final CriteriaBuilder criteriaBuilder;
	
	public FrequenciaRegistroCustomRepository(EntityManager entityManager) {
		this.entityManager = entityManager;
		this.criteriaBuilder = entityManager.getCriteriaBuilder();
	}
	
	public Page<FrequenciaRegistro> findAllWithFilters(FrequenciaRegistroPage frequenciaRegistroPage, FrequenciaRegistroCriteria frequenciaRegistroCriteria){
		CriteriaQuery<FrequenciaRegistro> criteriaQuery = criteriaBuilder.createQuery(FrequenciaRegistro.class);
		
		Root<FrequenciaRegistro> frequenciaRegistroRoot = criteriaQuery.from(FrequenciaRegistro.class);
		Predicate predicate = getPredicate(frequenciaRegistroCriteria, frequenciaRegistroRoot);
		criteriaQuery.where(predicate);
		setOrder(frequenciaRegistroPage, criteriaQuery, frequenciaRegistroRoot);
		
		TypedQuery<FrequenciaRegistro> typedQuery = entityManager.createQuery(criteriaQuery);
		typedQuery.setFirstResult(frequenciaRegistroPage.getPageNumber() * frequenciaRegistroPage.getPageSize());
		typedQuery.setMaxResults(frequenciaRegistroPage.getPageSize());
		List<FrequenciaRegistro> result = typedQuery.getResultList();
		sortFrequencias(result);
		Pageable pageable = getPageable(frequenciaRegistroPage);
		long frequenciaRegistroCount = getFrequenciaRegistroCount(predicate);
		return new PageImpl<>(result, pageable, frequenciaRegistroCount);
	}
	
	List<FrequenciaRegistro> sortFrequencias(List<FrequenciaRegistro> listaInicial){
		List<FrequenciaRegistro> listaHorariosSort = new ArrayList<>();
		
		for(FrequenciaRegistro f: listaInicial) {
			f.setHorarios(sortHorarios(f.getHorarios()));
			listaHorariosSort.add(f);
		}
		return listaHorariosSort;
	}
	
	List<Horario> sortHorarios(List<Horario> horarios){
		Collections.sort(horarios);
		return horarios;
	}
	
	private long getFrequenciaRegistroCount(Predicate predicate) {
		CriteriaQuery<Long> countQuery = criteriaBuilder.createQuery(Long.class);
		Root<FrequenciaRegistro> countRoot = countQuery.from(FrequenciaRegistro.class);
		countQuery.select(criteriaBuilder.count(countRoot)).where(predicate);
		return entityManager.createQuery(countQuery).getSingleResult();
	}

	private Pageable getPageable(FrequenciaRegistroPage frequenciaRegistroPage) {
		Sort sort = Sort.by(frequenciaRegistroPage.getSortDirection(), frequenciaRegistroPage.getSortBy());
		return PageRequest.of(frequenciaRegistroPage.getPageNumber(),  frequenciaRegistroPage.getPageSize(), sort);
	}

	private void setOrder(FrequenciaRegistroPage frequenciaRegistroPage, CriteriaQuery<FrequenciaRegistro> criteriaQuery, Root<FrequenciaRegistro> frequenciaRegistroRoot) {
		if(frequenciaRegistroPage.getSortDirection().equals(Sort.Direction.ASC)) {
			criteriaQuery.orderBy(criteriaBuilder.asc(frequenciaRegistroRoot.get(frequenciaRegistroPage.getSortBy())));
		}else {
			criteriaQuery.orderBy(criteriaBuilder.desc(frequenciaRegistroRoot.get(frequenciaRegistroPage.getSortBy())));
		}
	}
	
	private Predicate getPredicate(FrequenciaRegistroCriteria frequenciaRegistroCriteria, Root<FrequenciaRegistro> frequenciaRegistroRoot) {
		List<Predicate> predicates = new ArrayList<>();
		if(Objects.nonNull(frequenciaRegistroCriteria.getAluno()))
			predicates.add(criteriaBuilder.equal(frequenciaRegistroRoot.get("aluno"), frequenciaRegistroCriteria.getAluno()));

		if(Objects.nonNull(frequenciaRegistroCriteria.getProjeto()))
			predicates.add(criteriaBuilder.equal(frequenciaRegistroRoot.get("projeto"), frequenciaRegistroCriteria.getProjeto()));

		if(Objects.nonNull(frequenciaRegistroCriteria.getMesRef()))
			predicates.add(criteriaBuilder.equal(frequenciaRegistroRoot.get("mesRef"), frequenciaRegistroCriteria.getMesRef()));
		
		if(Objects.nonNull(frequenciaRegistroCriteria.getAnoRef()))
			predicates.add(criteriaBuilder.equal(frequenciaRegistroRoot.get("anoRef"), frequenciaRegistroCriteria.getAnoRef()));

		return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
	}
}
