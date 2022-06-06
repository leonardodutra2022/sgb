package br.ufc.crateus.sgb.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações do Banco, referente a conta bancária do aluno
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 * @see Banco
 */
@Entity(name="banco")
public class Banco {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public long id;
	
	@Column(length=200, name="nome_banco")
	public String nomeBanco;
	
	@Column(length=50, name="cod_banco")
	public String codBanco;

	public Banco() {
		
	}
	
	public Banco(long id, String nomeBanco, String codBanco) {
		this.id = id;
		this.nomeBanco = nomeBanco;
		this.codBanco = codBanco;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getNomeBanco() {
		return nomeBanco;
	}

	public void setNomeBanco(String nomeBanco) {
		this.nomeBanco = nomeBanco;
	}

	public String getCodBanco() {
		return codBanco;
	}

	public void setCodBanco(String codBanco) {
		this.codBanco = codBanco;
	}
	
}
