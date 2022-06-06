package br.ufc.crateus.sgb.model.dto;

import java.time.LocalDate;

import br.ufc.crateus.sgb.model.DocumentacaoArquivos;

/**
 * Classe dedicada a utilizar do artifício de transferência de objetos para operações específicas com uso do objeto, nesse caso para tratamento e armazenamento de arquivos.
 * @author Leonardo Dutra
 */
public class ArquivoDTO {

	private String formatoArquivo;

	private String nomeArquivo;

	private LocalDate dataPostagem;
	
	private float tamanhoArquivo;
	
	public ArquivoDTO() {
		
	}
	
	public ArquivoDTO(DocumentacaoArquivos docArquivos) {
		setFormatoArquivo(docArquivos.getFormatoArquivo());
		setNomeArquivo(docArquivos.getNomeArquivo());
		setDataPostagem(docArquivos.getDataPostagem());
		setTamanhoArquivo(docArquivos.getTamanhoArquivo());
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

	public void setDataPostagem(LocalDate dataPostagem) {
		this.dataPostagem = dataPostagem;
	}

	public float getTamanhoArquivo() {
		return tamanhoArquivo;
	}

	public void setTamanhoArquivo(float tamanhoArquivo) {
		this.tamanhoArquivo = tamanhoArquivo;
	}
	
	
	
}
