package br.ufc.crateus.sgb.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Entidade representa as informações do Campus, apenas para referencia qual campus o processo se refere, prevendo uma utilização em outros campis
 * @author Leonardo Dutra
 */
@Entity
public class Campus {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String nome;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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
