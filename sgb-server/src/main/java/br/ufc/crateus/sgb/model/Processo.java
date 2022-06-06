package br.ufc.crateus.sgb.model;

import java.time.LocalDate;
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
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.ufc.crateus.sgb.model.enums.StatusEnum;
import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações de cada processo criado
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 * @see StatusEnum
 * @see Campus
 * @see Beneficio
 */
@Entity
public class Processo {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Enumerated(EnumType.STRING)
	private StatusEnum statusProcesso;

	private int ano;

	@ManyToOne(fetch=FetchType.EAGER)
	private Campus campus;

	private LocalDate dataAbertura;

	private LocalDate dataEncerramento;
	
	private int vagas;
	
	private boolean ativo;
	
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataHora;

	@OneToOne
	private Beneficio beneficio;
	
	private boolean possuiEntrevista;
	
	@Column(length = 500)
	private String descricao;
	
	private boolean unificado;
	
	public boolean isUnificado() {
		return unificado;
	}

	public void setUnificado(boolean unificado) {
		this.unificado = unificado;
	}

	public Processo() {
		
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public StatusEnum getStatusProcesso() {
		return statusProcesso;
	}

	public void setStatusProcesso(StatusEnum statusProcesso) {
		this.statusProcesso = statusProcesso;
	}

	public Campus getCampus() {
		return campus;
	}

	public void setCampus(Campus campus) {
		this.campus = campus;
	}

	public int getAno() {
		return ano;
	}

	public void setAno(int ano) {
		this.ano = ano;
	}

	public int getVagas() {
		return vagas;
	}

	public void setVagas(int vagas) {
		this.vagas = vagas;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	public LocalDate getDataAbertura() {
		return dataAbertura;
	}

	public void setDataAbertura(LocalDate dataAbertura) {
		this.dataAbertura = dataAbertura;
	}

	public LocalDate getDataEncerramento() {
		return dataEncerramento;
	}

	public void setDataEncerramento(LocalDate dataEncerramento) {
		this.dataEncerramento = dataEncerramento;
	}

	public Beneficio getBeneficio() {
		return beneficio;
	}

	public void setBeneficio(Beneficio beneficio) {
		this.beneficio = beneficio;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public Date getDataHora() {
		return dataHora;
	}

	public void setDataHora(Date dataHora) {
		this.dataHora = dataHora;
	}

	public boolean isPossuiEntrevista() {
		return possuiEntrevista;
	}

	public void setPossuiEntrevista(boolean possuiEntrevista) {
		this.possuiEntrevista = possuiEntrevista;
	}
	
}
