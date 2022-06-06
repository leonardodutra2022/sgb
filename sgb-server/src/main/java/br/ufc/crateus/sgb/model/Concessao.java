package br.ufc.crateus.sgb.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.ufc.crateus.sgb.model.enums.StatusEnum;
import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações de Concessões, como registro de concessão de benefício
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 * @see Concessao
 * @see Aluno
 * @see Beneficio
 * @see StatusEnum
 * @see Processo
 */
@Entity
public class Concessao {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@OneToOne
	private Aluno aluno;
	
	@OneToOne
	private Beneficio beneficio;
	
	@Enumerated(EnumType.STRING)
	private StatusEnum concessaoStatus;
	
	private LocalDate dataConcessao;
	
	private LocalDate dataConcessaoFinal;
	
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataHora;
	
	@ManyToOne(cascade = CascadeType.REFRESH)
	private Processo processo;
	
	public Concessao() {
		
	}
	
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Beneficio getBeneficio() {
		return beneficio;
	}
	public void setBeneficio(Beneficio beneficio) {
		this.beneficio = beneficio;
	}
	public StatusEnum getConcessaoStatus() {
		return concessaoStatus;
	}
	public void setConcessaoStatus(StatusEnum concessaoStatus) {
		this.concessaoStatus = concessaoStatus;
	}
	public Aluno getAluno() {
		return aluno;
	}
	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}
	public LocalDate getDataConcessao() {
		return dataConcessao;
	}
	public void setDataConcessao(LocalDate dataConcessao) {
		this.dataConcessao = dataConcessao;
	}
	public LocalDate getDataConcessaoFinal() {
		return dataConcessaoFinal;
	}
	public void setDataConcessaoFinal(LocalDate dataConcessaoFinal) {
		this.dataConcessaoFinal = dataConcessaoFinal;
	}
	public Date getDataHora() {
		return dataHora;
	}
	public void setDataHora(Date dataHora) {
		this.dataHora = dataHora;
	}
	public Processo getProcesso() {
		return processo;
	}
	public void setProcesso(Processo processo) {
		this.processo = processo;
	}
	
}
