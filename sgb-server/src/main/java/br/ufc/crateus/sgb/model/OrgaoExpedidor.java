package br.ufc.crateus.sgb.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações de órgãos expedidores, referente a documentação básica do aluno, como RG ou CNH e etc
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 */
@Entity(name="orgao_expedidor")
public class OrgaoExpedidor{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	public long id;
	
	@Column(length=20, name="sigla")
	public String sigla;
	
	@Column(length=255, name="descricao")
	public String descricao;
	
	public OrgaoExpedidor() {
		
	}

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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
		
}
