package br.ufc.crateus.sgb.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import br.ufc.crateus.sgb.model.enums.FrequenciaEnum;

/**
 *  Entidade representa as informações de projetos da universidade
 *  @author Leonardo Dutra 
 *  @see Aluno  
 */
@Entity
public class Projeto {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	@Column(length = 500)
	private String titulo;

	@Column(length = 5000)
	private String descricao;

	private int totalHoras;
	
	@OneToMany
	private List<Aluno> aluno;
	
	@ManyToOne
	private Usuario responsavel;
	
	@Enumerated(EnumType.STRING)
	private FrequenciaEnum status;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitulo() {
		return titulo;
	}

	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public int getTotalHoras() {
		return totalHoras;
	}

	public void setTotalHoras(int totalHoras) {
		this.totalHoras = totalHoras;
	}

	public List<Aluno> getAluno() {
		return aluno;
	}

	public void setAluno(List<Aluno> aluno) {
		this.aluno = aluno;
	}

	public Usuario getResponsavel() {
		return responsavel;
	}

	public void setResponsavel(Usuario responsavel) {
		this.responsavel = responsavel;
	}
	
	public FrequenciaEnum getStatus() {
		return status;
	}

	public void setStatus(FrequenciaEnum status) {
		this.status = status;
	}

}