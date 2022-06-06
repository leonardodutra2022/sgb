package br.ufc.crateus.sgb.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import br.ufc.crateus.sgb.model.enums.TipoBeneficioEnum;
import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações do Benefício (cadastro de auxílios e benefícios)
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 * @see Beneficio
 * @see TipoBeneficioEnum
 */
@Entity
public class Beneficio {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(length=200)
	private String nome;

	@Column(length=500)
	private String descricao;

	private boolean permiteAcumulacao;

	private float valor;

	private int mesesConcessao;

	private String renovacao;
	
	@Enumerated(EnumType.STRING)
	private TipoBeneficioEnum tipoBeneficio;
	
	public Beneficio() {
		
	}

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

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public boolean isPermiteAcumulacao() {
		return permiteAcumulacao;
	}

	public void setPermiteAcumulacao(boolean permiteAcumulacao) {
		this.permiteAcumulacao = permiteAcumulacao;
	}

	public float getValor() {
		return valor;
	}

	public void setValor(float valor) {
		this.valor = valor;
	}

	public int getMesesConcessao() {
		return mesesConcessao;
	}

	public void setMesesConcessao(int mesesConcessao) {
		this.mesesConcessao = mesesConcessao;
	}

	public String getRenovacao() {
		return renovacao;
	}

	public void setRenovacao(String renovacao) {
		this.renovacao = renovacao;
	}

	public TipoBeneficioEnum getTipoBeneficio() {
		return tipoBeneficio;
	}

	public void setTipoBeneficio(TipoBeneficioEnum tipoBeneficio) {
		this.tipoBeneficio = tipoBeneficio;
	}

}
