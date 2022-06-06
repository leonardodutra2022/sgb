package br.ufc.crateus.sgb.model;

import java.time.LocalDate;
import java.time.LocalTime;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import br.ufc.crateus.sgb.model.enums.StatusEnum;
/**
 * Entidade representa notificações por e-mail que são dispachadas para informação ou comunicação com o usuário.
 * @author Leonardo Dutra
 * @see Inscricao
 * @see StatusEnum
 */
@Entity
public class Notificacao {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Enumerated(EnumType.STRING)
	private StatusEnum statusRefNotificacao;
	
	private String descricao;
	
	private LocalDate dataRegistro;
	
	private LocalTime horaRegistro;
	
	@ManyToOne
	private Inscricao inscricaoRef;
	
	private boolean envio;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public StatusEnum getStatusRefNotificacao() {
		return statusRefNotificacao;
	}

	public void setStatusRefNotificacao(StatusEnum statusRefNotificacao) {
		this.statusRefNotificacao = statusRefNotificacao;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public LocalDate getDataRegistro() {
		return dataRegistro;
	}

	public void setDataRegistro(LocalDate dataRegistro) {
		this.dataRegistro = dataRegistro;
	}

	public boolean isEnvio() {
		return envio;
	}

	public void setEnvio(boolean envio) {
		this.envio = envio;
	}

	public Inscricao getInscricaoRef() {
		return inscricaoRef;
	}

	public void setInscricaoRef(Inscricao inscricaoRef) {
		this.inscricaoRef = inscricaoRef;
	}

	public LocalTime getHoraRegistro() {
		return horaRegistro;
	}

	public void setHoraRegistro(LocalTime horaRegistro) {
		this.horaRegistro = horaRegistro;
	}	
	
}
