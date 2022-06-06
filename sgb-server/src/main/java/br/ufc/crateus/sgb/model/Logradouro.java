package br.ufc.crateus.sgb.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações de logradouro do aluno ou da família do mesmo
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 * @see LogradouroTipo
 * @see Cidade
 * @see Estado
 */
@Embeddable
@Entity
public class Logradouro {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String nomeRua;

	private String referencia;

	private String numCasa;

	@ManyToOne(cascade = CascadeType.REFRESH)
	private LogradouroTipo tipoRua;

	private String tipoCasa;

	private String bairro;

	private String cep;

	@ManyToOne(cascade = CascadeType.REFRESH)
	private Cidade cidade;

	@ManyToOne
	private Estado uf;

	private String complemento;
	
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date data;
	
	public Logradouro() {
		
	}
	
	public Date getData() {
		return data;
	}

	public void setData(Date data) {
		this.data = data;
	}

	public String getNomeRua() {
		return nomeRua;
	}

	public void setNomeRua(String nomeRua) {
		this.nomeRua = nomeRua;
	}

	public String getReferencia() {
		return referencia;
	}

	public void setReferencia(String referencia) {
		this.referencia = referencia;
	}

	public String getNumCasa() {
		return numCasa;
	}

	public void setNumCasa(String numCasa) {
		this.numCasa = numCasa;
	}

	public String getTipoCasa() {
		return tipoCasa;
	}

	public void setTipoCasa(String tipoCasa) {
		this.tipoCasa = tipoCasa;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public LogradouroTipo getTipoRua() {
		return tipoRua;
	}

	public void setTipoRua(LogradouroTipo tipoRua) {
		this.tipoRua = tipoRua;
	}

	public Cidade getCidade() {
		return cidade;
	}

	public void setCidade(Cidade cidade) {
		this.cidade = cidade;
	}

	public Estado getUf() {
		return uf;
	}

	public void setUf(Estado uf) {
		this.uf = uf;
	}
	
}
