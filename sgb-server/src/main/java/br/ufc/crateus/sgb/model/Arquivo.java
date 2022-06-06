package br.ufc.crateus.sgb.model;

import java.time.LocalDate;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * Entidade representa as informações do arquivo postado, como documentos scaneados.
 * @author Leonardo Dutra
 */
public class Arquivo {

	private String formatoArquivo;

	private String nomeArquivo;

	private LocalDate dataPostagem;
	
	private float tamanhoArquivo;
	
	private String url;
	
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataHora;
	
	public Date getDataHora() {
		return dataHora;
	}

	public void setDataHora(Date dataHora) {
		this.dataHora = dataHora;
	}

	public Arquivo() {
		
	}
	
	public Arquivo(String formatoArquivo, String nomeArquivo, LocalDate dataPostagem, float tamanhoArquivo, String url) {
		this.formatoArquivo = formatoArquivo;
		this.nomeArquivo = nomeArquivo;
		this.dataPostagem = dataPostagem;
		this.tamanhoArquivo = tamanhoArquivo;
		this.url = url;
	}

	public Arquivo(String nomeArquivo, String url) {
		this.nomeArquivo = nomeArquivo;
		this.url = url;
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

	public LocalDate getDataPostagem() {
		return dataPostagem;
	}

	public void setDataPostagem(LocalDate localDate) {
		this.dataPostagem = localDate;
	}

	public float getTamanhoArquivo() {
		return tamanhoArquivo;
	}

	public void setTamanhoArquivo(float tamanhoArquivo) {
		this.tamanhoArquivo = tamanhoArquivo;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		return "Arquivo [formatoArquivo=" + formatoArquivo + ", nomeArquivo=" + nomeArquivo + ", dataPostagem="
				+ dataPostagem + ", tamanhoArquivo=" + tamanhoArquivo + ", url=" + url + "]";
	}
	
	public int getColumnCount() {
		return getClass().getDeclaredFields().length;
	}
}
