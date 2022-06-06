package br.ufc.crateus.sgb.model;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import br.ufc.crateus.sgb.model.enums.StatusEnum;

/**
 * Entidade representa as informações de agendamento de entrevistas referente a alguns tipos de processo, em que o aluno tem que se submeter a esse tipo de procedimento
 * @author Leonardo Dutra
 * @see Inscricao 
 * @see StatusEnum
 */
@Entity
public class Entrevista {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	@ManyToOne
	private Inscricao inscricao;
	
	@ManyToOne
	private Processo processo;

	@Enumerated(EnumType.STRING)
	private StatusEnum parecerMembroComissao;

	@Enumerated(EnumType.STRING)
	private StatusEnum parecerFinal;

	private LocalDate data;
	
	private String hora;
	
	private String localEntrevista;
	
	private String observacoes;

	@Column(length = 500)
	private String relatorio;
	
	private LocalDate dataRegistro;
	
	private String membroComissao;

	public LocalDate getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(LocalDate dataRegistro) {
		this.dataRegistro = dataRegistro;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Inscricao getInscricao() {
		return inscricao;
	}

	public void setInscricao(Inscricao inscricao) {
		this.inscricao = inscricao;
	}

	public StatusEnum getParecerMembroComissao() {
		return parecerMembroComissao;
	}

	public void setParecerMembroComissao(StatusEnum parecerMembroComissao) {
		this.parecerMembroComissao = parecerMembroComissao;
	}

	public StatusEnum getParecerFinal() {
		return parecerFinal;
	}

	public void setParecerFinal(StatusEnum parecerFinal) {
		this.parecerFinal = parecerFinal;
	}

	public String getRelatorio() {
		return relatorio;
	}

	public void setRelatorio(String relatorio) {
		this.relatorio = relatorio;
	}

	public String getMembroComissao() {
		return membroComissao;
	}

	public void setMembroComissao(String membroComissao) {
		this.membroComissao = membroComissao;
	}

	public String getLocalEntrevista() {
		return localEntrevista;
	}

	public void setLocalEntrevista(String localEntrevista) {
		this.localEntrevista = localEntrevista;
	}

	public String getObservacoes() {
		return observacoes;
	}

	public void setObservacoes(String observacoes) {
		this.observacoes = observacoes;
	}

	public LocalDate getData() {
		return data;
	}

	public void setData(LocalDate data) {
		this.data = data;
	}
	
	public String getHora() {
		return hora;
	}

	public void setHora(String hora) {
		this.hora = hora;
	}

	
	
	public Processo getProcesso() {
		return processo;
	}

	public void setProcesso(Processo processo) {
		this.processo = processo;
	}

	public int getColumnCount() {
		return getClass().getDeclaredFields().length;
	}
	
}
