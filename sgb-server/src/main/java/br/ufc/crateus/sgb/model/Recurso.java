package br.ufc.crateus.sgb.model;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import br.ufc.crateus.sgb.model.enums.StatusEnum;
import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações de recursos interpostos pelo aluno quando sua inscrição recebe status INDEFERIDO na fase de análise por algum motivo
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 * @see Processo
 * @see Inscricao
 * @see StatusEnum
 * @see Usuario
 * @see DocumentacaoArquivos
 */
@Entity
public class Recurso {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	@ManyToOne(fetch=FetchType.EAGER)
	private Processo processo;
	
	@ManyToOne(cascade = CascadeType.REFRESH)
	private Inscricao inscricao;

	private String fundamentacao;

	@Enumerated(EnumType.STRING)
	private StatusEnum status;

	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataHora;

	@Enumerated(EnumType.STRING)
	private StatusEnum parecer;

	@OneToOne
	private Usuario membroComissaoAnalisador;

	private String relatorioParecer;
	
	@OneToOne
	private DocumentacaoArquivos docArquivo;
	
	public Recurso() {
		
	}

	public String getFundamentacao() {
		return fundamentacao;
	}

	public void setFundamentacao(String fundamentacao) {
		this.fundamentacao = fundamentacao;
	}

	public StatusEnum getStatus() {
		return status;
	}

	public void setStatus(StatusEnum status) {
		this.status = status;
	}

	public Date getDataHora() {
		return dataHora;
	}

	public void setDataHora(Date dataHora) {
		this.dataHora = dataHora;
	}

	public String getRelatorioParecer() {
		return relatorioParecer;
	}

	public void setRelatorioParecer(String relatorioParecer) {
		this.relatorioParecer = relatorioParecer;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public StatusEnum getParecer() {
		return parecer;
	}

	public void setParecer(StatusEnum parecer) {
		this.parecer = parecer;
	}

	public Processo getProcesso() {
		return processo;
	}

	public void setProcesso(Processo processo) {
		this.processo = processo;
	}

	public Inscricao getInscricao() {
		return inscricao;
	}

	public void setInscricao(Inscricao inscricao) {
		this.inscricao = inscricao;
	}

	public Usuario getMembroComissaoAnalisador() {
		return membroComissaoAnalisador;
	}

	public void setMembroComissaoAnalisador(Usuario membroComissaoAnalisador) {
		this.membroComissaoAnalisador = membroComissaoAnalisador;
	}

	public DocumentacaoArquivos getDocArquivo() {
		return docArquivo;
	}

	public void setDocArquivo(DocumentacaoArquivos docArquivo) {
		this.docArquivo = docArquivo;
	}
	
}
