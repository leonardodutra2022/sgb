package br.ufc.crateus.sgb.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações de tipos de logradouro, como RUA, AVENIDA e etc, visando categorizar melhor o cadastro de logradouro.
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 */
@Entity(name="logradouro_tipo")
public class LogradouroTipo {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public long id;
	
	@Column(length=100)
	public String descricao;
	
	@Column(length=10)
	public String abreviatura;
	
	public LogradouroTipo() {
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getAbreviatura() {
		return abreviatura;
	}

	public void setAbreviatura(String abreviatura) {
		this.abreviatura = abreviatura;
	}
	
}
