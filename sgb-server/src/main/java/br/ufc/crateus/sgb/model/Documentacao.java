package br.ufc.crateus.sgb.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import br.ufc.crateus.sgb.model.enums.DocumentacaoCategoriaEnum;
import br.ufc.crateus.sgb.model.enums.DocumentacaoGrupoEnum;
import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações da documentação a ser apresentada pelo aluno em cada processo
 * @author Leonardo Dutra
 * @see AbstractTypeReference
 * @see Documentacao
 * @see DocumentacaoCategoriaEnum
 * @see Beneficio
 */
@Entity
public class Documentacao {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	private String documento;

	private String descricao;
	
	private boolean obrigatorio;
	
	@Enumerated(EnumType.STRING)
	private DocumentacaoCategoriaEnum categoria;
	
	private boolean ativo;
	
	private String documentoTipo;
	
	@ManyToMany
	private List<Beneficio> beneficios;
	
	@Enumerated(EnumType.STRING)
	private DocumentacaoGrupoEnum grupoDoc;
	
	private int sequencia;
	
	public Documentacao() {
		
	}

	public DocumentacaoGrupoEnum getGrupoDoc() {
		return grupoDoc;
	}

	public void setGrupoDoc(DocumentacaoGrupoEnum grupoDoc) {
		this.grupoDoc = grupoDoc;
	}

	public String getDocumento() {
		return documento;
	}

	public void setDocumento(String documento) {
		this.documento = documento;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}


	public boolean isObrigatorio() {
		return obrigatorio;
	}

	public void setObrigatorio(boolean obrigatorio) {
		this.obrigatorio = obrigatorio;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public boolean isAtivo() {
		return ativo;
	}

	public void setAtivo(boolean ativo) {
		this.ativo = ativo;
	}

	public String getDocumentoTipo() {
		return documentoTipo;
	}

	public void setDocumentoTipo(String documentoTipo) {
		this.documentoTipo = documentoTipo;
	}

	public DocumentacaoCategoriaEnum getCategoria() {
		return categoria;
	}

	public void setCategoria(DocumentacaoCategoriaEnum categoria) {
		this.categoria = categoria;
	}

	public List<Beneficio> getBeneficios() {
		return beneficios;
	}

	public void setBeneficios(List<Beneficio> beneficios) {
		this.beneficios = beneficios;
	}

	public int getSequencia() {
		return sequencia;
	}

	public void setSequencia(int sequencia) {
		this.sequencia = sequencia;
	}
	
}
