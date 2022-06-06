package br.ufc.crateus.sgb.model;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import br.ufc.crateus.sgb.model.enums.StatusEnum;

@Entity
public class Comissao {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	@OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	private List<MembroComissao> membros;

	@Enumerated(EnumType.STRING)
	private StatusEnum status;


	private boolean presidente;

	private Date dataCriada;

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

	public boolean isPresidente() {
		return presidente;
	}

	public void setPresidente(boolean presidente) {
		this.presidente = presidente;
	}

	public Date getDataCriada() {
		return dataCriada;
	}

	public void setDataCriada(Date dataCriada) {
		this.dataCriada = dataCriada;
	}

	public List<MembroComissao> getMembros() {
		return membros;
	}

	public void setMembros(List<MembroComissao> membros) {
		this.membros = membros;
	}	

	public int getColumnCount() {
		return getClass().getDeclaredFields().length;
	}
}
