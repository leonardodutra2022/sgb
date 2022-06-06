package br.ufc.crateus.sgb.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.ufc.crateus.sgb.model.enums.StatusEnum;
import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações acadêmicas do aluno, como histórico de cursos realizados anteriormente ou semestres cursados
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 * @see DadosAcademicos
 * @see StatusEnum
 * @see Aluno
 */
@Entity
public class DadosAcademicos {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String matricula;
	
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date data;

	private String observacoes;

	private String curso;

	@Enumerated(EnumType.STRING)
	private StatusEnum status;

	private int semestreCursado;

	private float desempenhoPercentual;
	
	private float frequenciaPercentual;

	private int totalCreditoCursado;
	
	private int totalCreditoAprovado;
	
	private String periodoLetivo;
	
	private float ira;
	
	@OneToOne
	private Aluno aluno;
	
	public DadosAcademicos() {
		
	}
	
	public float getIra() {
		return ira;
	}

	public void setIra(float ira) {
		this.ira = ira;
	}

	public String getMatricula() {
		return matricula;
	}

	public void setMatricula(String matricula) {
		this.matricula = matricula;
	}

	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

	public int getSemestreCursado() {
		return semestreCursado;
	}

	public void setSemestreCursado(int semestreCursado) {
		this.semestreCursado = semestreCursado;
	}

	public float getDesempenhoPercentual() {
		return desempenhoPercentual;
	}

	public void setDesempenhoPercentual(float desempenhoPercentual) {
		this.desempenhoPercentual = desempenhoPercentual;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public StatusEnum getStatus() {
		return status;
	}

	public void setStatus(StatusEnum status) {
		this.status = status;
	}

	public String getCurso() {
		return curso;
	}

	public void setCurso(String curso) {
		this.curso = curso;
	}

	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}

	public float getFrequenciaPercentual() {
		return frequenciaPercentual;
	}

	public void setFrequenciaPercentual(float frequenciaPercentual) {
		this.frequenciaPercentual = frequenciaPercentual;
	}

	public int getTotalCreditoCursado() {
		return totalCreditoCursado;
	}

	public void setTotalCreditoCursado(int totalCreditoCursado) {
		this.totalCreditoCursado = totalCreditoCursado;
	}

	public int getTotalCreditoAprovado() {
		return totalCreditoAprovado;
	}

	public void setTotalCreditoAprovado(int totalCreditoAprovado) {
		this.totalCreditoAprovado = totalCreditoAprovado;
	}

	public String getPeriodoLetivo() {
		return periodoLetivo;
	}

	public void setPeriodoLetivo(String periodoLetivo) {
		this.periodoLetivo = periodoLetivo;
	}	

}
