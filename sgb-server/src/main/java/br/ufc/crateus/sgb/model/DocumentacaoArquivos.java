package br.ufc.crateus.sgb.model;

import java.time.LocalDate;
import java.util.Date;

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
 * Entidade representa as informações de arquivos armazenados referentes a documentação apresentada pelo aluno
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 * @see DocumentacaoArquivos
 * @see Documentacao
 * @see Inscricao
 * @see Processo
 * @see StatusEnum
 */
@Entity
public class DocumentacaoArquivos {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	@ManyToOne(fetch=FetchType.EAGER)
	private Documentacao documentacao;

	private boolean paraInscricao;
	
	private boolean paraProcesso;
	
	private boolean paraRecurso;
	
	private boolean comum;

	@OneToOne
	private Inscricao inscricao;

	@OneToOne
	private Processo processo;
	
	@Column(length=10)
	private String formatoArquivo;

	private String nomeArquivo;
	
	private String nomeArquivoFinal;
	
	private float tamanhoArquivo;

	private LocalDate dataPostagem;

	@Enumerated(EnumType.STRING)
	private StatusEnum situacaoDocumento;

	private String descricao;
	
	private boolean publico;
	
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataAtualizacao;

	private String docTipo;
	
	private boolean validado;
	
	private String nomeUsuarioValidador;
	
	public DocumentacaoArquivos() {
		
	}
	
	public Date getDataAtualizacao() {
		return dataAtualizacao;
	}

	public void setDataAtualizacao(Date dataAtualizacao) {
		this.dataAtualizacao = dataAtualizacao;
	}

	public Documentacao getDocumentacao() {
		return documentacao;
	}

	public void setDocumentacao(Documentacao documentacao) {
		this.documentacao = documentacao;
	}

	public boolean isParaInscricao() {
		return paraInscricao;
	}

	public void setParaInscricao(boolean paraInscricao) {
		this.paraInscricao = paraInscricao;
	}

	public String getFormatoArquivo() {
		return formatoArquivo;
	}

	public void setFormatoArquivo(String formatoArquivo) {
		this.formatoArquivo = formatoArquivo;
	}

	public String getNomeArquivo() {
		return nomeArquivo;
	}

	public void setNomeArquivo(String nomeArquivo) {
		this.nomeArquivo = nomeArquivo;
	}

	public StatusEnum getSituacaoDocumento() {
		return situacaoDocumento;
	}

	public void setSituacaoDocumento(StatusEnum situacaoDocumento) {
		this.situacaoDocumento = situacaoDocumento;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public boolean isPublico() {
		return publico;
	}

	public void setPublico(boolean publico) {
		this.publico = publico;
	}

	public Inscricao getInscricao() {
		return inscricao;
	}

	public void setInscricao(Inscricao inscricao) {
		this.inscricao = inscricao;
	}

	public boolean isParaProcesso() {
		return paraProcesso;
	}

	public void setParaProcesso(boolean paraProcesso) {
		this.paraProcesso = paraProcesso;
	}

	public boolean isComum() {
		return comum;
	}

	public void setComum(boolean comum) {
		this.comum = comum;
	}

	public Processo getProcesso() {
		return processo;
	}

	public void setProcesso(Processo processo) {
		this.processo = processo;
	}

	public boolean isParaRecurso() {
		return paraRecurso;
	}

	public void setParaRecurso(boolean paraRecurso) {
		this.paraRecurso = paraRecurso;
	}

	public float getTamanhoArquivo() {
		return tamanhoArquivo;
	}

	public void setTamanhoArquivo(float tamanhoArquivo) {
		this.tamanhoArquivo = tamanhoArquivo;
	}

	public LocalDate getDataPostagem() {
		return dataPostagem;
	}

	public void setDataPostagem(LocalDate dataPostagem) {
		this.dataPostagem = dataPostagem;
	}

	public String getDocTipo() {
		return docTipo;
	}

	public void setDocTipo(String docTipo) {
		this.docTipo = docTipo;
	}

	public String getNomeArquivoFinal() {
		return nomeArquivoFinal;
	}

	public void setNomeArquivoFinal(String nomeArquivoFinal) {
		this.nomeArquivoFinal = nomeArquivoFinal;
	}

	public boolean isValidado() {
		return validado;
	}

	public void setValidado(boolean validado) {
		this.validado = validado;
	}

	public String getNomeUsuarioValidador() {
		return nomeUsuarioValidador;
	}

	public void setNomeUsuarioValidador(String nomeUsuarioValidador) {
		this.nomeUsuarioValidador = nomeUsuarioValidador;
	}

}
