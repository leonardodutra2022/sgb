package br.ufc.crateus.sgb.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Entidade representa dedicada a realização de manutenção do sistema, ou seja, quando há registro com status (manutencao = true), então o sistema ficará indisponível por um período de 1h para manutenção e será informada quando qualquer usuário tentar acessar o sistema na web.
 * @author Leonardo Dutra
 */
@Entity
public class Sistema {

	@Id
	private long id;	
	private boolean manutencao;
	private boolean forceClientUpdate;
	private String versionRecent;
	private int prazoHoras;

	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataHora;
	
	public boolean isManutencao() {
		return manutencao;
	}

	public void setManutencao(boolean manutencao) {
		this.manutencao = manutencao;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getDataHora() {
		return dataHora;
	}

	public void setDataHora(Date dataHora) {
		this.dataHora = dataHora;
	}

	public boolean isForceClientUpdate() {
		return forceClientUpdate;
	}

	public void setForceClientUpdate(boolean forceClientUpdate) {
		this.forceClientUpdate = forceClientUpdate;
	}

	public String getVersionRecent() {
		return versionRecent;
	}

	public void setVersionRecent(String versionRecent) {
		this.versionRecent = versionRecent;
	}

	public int getPrazoHoras() {
		return prazoHoras;
	}

	public void setPrazoHoras(int prazoHoras) {
		this.prazoHoras = prazoHoras;
	}
	
}
