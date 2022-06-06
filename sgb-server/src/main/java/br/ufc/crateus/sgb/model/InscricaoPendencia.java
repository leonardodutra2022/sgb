package br.ufc.crateus.sgb.model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.ufc.crateus.sgb.model.enums.PendenciaEnum;

/**
 * Entidade representa as informações de pendências nas inscrições, ou seja, quando há problemas ocorridas nas inscrições ou perca de dados, a comissão que analisa as inscrições podem lançar pendências para o aluno corrigir quando entrarem na sua conta do sistema - sendo informado da pendência assim que entrar no sistema.
 * @author Leonardo Dutra
 * @see PendenciaEnum
 * @see Inscricao
 */
@Entity
public class InscricaoPendencia {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Enumerated(EnumType.STRING)
	private PendenciaEnum pendencia;
	
	private boolean concluido;
	
	@ManyToOne(cascade = CascadeType.REFRESH)
	private Inscricao inscricao;
	
	private String routerRecurso;
	
	private String observacao;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public PendenciaEnum getPendencia() {
		return pendencia;
	}

	public void setPendencia(PendenciaEnum pendencia) {
		this.pendencia = pendencia;
	}

	public boolean isConcluido() {
		return concluido;
	}

	public void setConcluido(boolean concluido) {
		this.concluido = concluido;
	}

	public Inscricao getInscricao() {
		return inscricao;
	}

	public void setInscricao(Inscricao inscricao) {
		this.inscricao = inscricao;
	}

	public String getRouterRecurso() {
		return routerRecurso;
	}

	public void setRouterRecurso(String routerRecurso) {
		this.routerRecurso = routerRecurso;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}
	
	public int getColumnCount() {
		return getClass().getDeclaredFields().length;
	}
}
