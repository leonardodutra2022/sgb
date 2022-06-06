package br.ufc.crateus.sgb.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.ufc.crateus.sgb.model.enums.EscolaridadeEnum;
import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações sócioeconômica familiar do aluno, onde é cadastrado a composição familiar do mesmo
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 * @see SituacaoSocioEconFamiliar
 * @see EscolaridadeEnum
 * @see Aluno
 */
@Entity
public class SituacaoSocioEconFamiliar {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private long id;
    
	private String nomeCompleto;

	private String parentesco;

	@Enumerated(EnumType.STRING)
	private EscolaridadeEnum escolaridade;

	private int idade;

	private String atividadeProfissao;

	private float rendaMensal;

	@ManyToOne(fetch=FetchType.EAGER)
	private Aluno aluno;
	
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date data;

	public SituacaoSocioEconFamiliar() {
		
	}
	
	public String getNomeCompleto() {
		return nomeCompleto;
	}

	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}

	public EscolaridadeEnum getEscolaridade() {
		return escolaridade;
	}

	public void setEscolaridade(EscolaridadeEnum escolaridade) {
		this.escolaridade = escolaridade;
	}

	public int getIdade() {
		return idade;
	}

	public void setIdade(int idade) {
		this.idade = idade;
	}

	public String getAtividadeProfissao() {
		return atividadeProfissao;
	}

	public void setAtividadeProfissao(String atividadeProfissao) {
		this.atividadeProfissao = atividadeProfissao;
	}

	public float getRendaMensal() {
		return rendaMensal;
	}

	public void setRendaMensal(float rendaMensal) {
		this.rendaMensal = rendaMensal;
	}

	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getParentesco() {
		return parentesco;
	}

	public void setParentesco(String parentesco) {
		this.parentesco = parentesco;
	}

	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}	

}
