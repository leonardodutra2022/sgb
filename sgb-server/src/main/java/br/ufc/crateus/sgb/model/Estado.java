package br.ufc.crateus.sgb.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Entidade representa as informações de unidades da federação do brasil, visando referenciar ao logradouro cadastrado
 * @author Leonardo Dutra
 */
@Entity(name="estado")
public class Estado {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public long id;

	@Column(length=10, name="sigla")
	public String sigla;
	
	@Column(length=100, name="nome")
	public String nome;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getSigla() {
		return sigla;
	}

	public void setSigla(String sigla) {
		this.sigla = sigla;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public int getColumnCount() {
		return getClass().getDeclaredFields().length;
	}
	
}
