package br.ufc.crateus.sgb.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import br.ufc.crateus.sgb.model.enums.StatusEnum;

/**
 * Entidade representa as informações de validação das inscrições, ou seja, é registrada quando uma inscrição é iniciada, e aos poucos são atualizadas cada etapa para se atingir todas as exigências para a inscrição finalmente ser validada, então nessa entidade registra inicialmente uma inscrição com status para cada etapa (atributo no caso dessa classe), onde cada vez que o aluno preenchar um requisito da inscrição é atualizado aqui o status - true ou false - para indicar que foi completado a etapa.
 * @author Leonardo Dutra
 * @see StatusEnum
 * @see Inscricao
 */
@Entity
public class InscricaoValidacao{

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String assinaturaEletronica;

	private boolean dadosPessoaisCompleto;
	
	private boolean dadosSocioEconCompleto;
	
	private boolean dadosContatosLogradouroCompleto;
	
	private boolean dadosAcadCompleto;
	
	private boolean dadosMoradiaTransporteCompleto;
	
	private boolean infoFinanceiroCompleto;
	
	private boolean dadosSaudeDeficienciaCompleto;
	
	private boolean dadosOutrosAuxiliosCompleto;
	
	private boolean documentacaoCompleta;
	
	private boolean cpfValido;
	
	private boolean matriculaAtualizada;
	
	private String analiseComissao;
	
	@Enumerated(EnumType.STRING)
	private StatusEnum resultadoComissao;
	
	@OneToOne
	private Inscricao inscricao;
	
//	@ManyToOne
//	private Pessoa responsavelValidacao;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getAssinaturaEletronica() {
		return assinaturaEletronica;
	}

	public void setAssinaturaEletronica(String assinaturaEletronica) {
		this.assinaturaEletronica = assinaturaEletronica;
	}

	public boolean isDadosPessoaisCompleto() {
		return dadosPessoaisCompleto;
	}

	public void setDadosPessoaisCompleto(boolean dadosPessoaisCompleto) {
		this.dadosPessoaisCompleto = dadosPessoaisCompleto;
	}

	public boolean isDadosSocioEconCompleto() {
		return dadosSocioEconCompleto;
	}

	public void setDadosSocioEconCompleto(boolean dadosSocioEconCompleto) {
		this.dadosSocioEconCompleto = dadosSocioEconCompleto;
	}

	public boolean isDadosContatosLogradouroCompleto() {
		return dadosContatosLogradouroCompleto;
	}

	public void setDadosContatosLogradouroCompleto(boolean dadosContatosLogradouroCompleto) {
		this.dadosContatosLogradouroCompleto = dadosContatosLogradouroCompleto;
	}

	public boolean isDadosAcadCompleto() {
		return dadosAcadCompleto;
	}

	public void setDadosAcadCompleto(boolean dadosAcadCompleto) {
		this.dadosAcadCompleto = dadosAcadCompleto;
	}

	public boolean isDocumentacaoCompleta() {
		return documentacaoCompleta;
	}

	public void setDocumentacaoCompleta(boolean documentacaoCompleta) {
		this.documentacaoCompleta = documentacaoCompleta;
	}

	public String getAnaliseComissao() {
		return analiseComissao;
	}

	public void setAnaliseComissao(String analiseComissao) {
		this.analiseComissao = analiseComissao;
	}

	public StatusEnum getResultadoComissao() {
		return resultadoComissao;
	}

	public void setResultadoComissao(StatusEnum resultadoComissao) {
		this.resultadoComissao = resultadoComissao;
	}

	public Inscricao getInscricao() {
		return inscricao;
	}

	public void setInscricao(Inscricao inscricao) {
		this.inscricao = inscricao;
	}

	public boolean isDadosMoradiaTransporteCompleto() {
		return dadosMoradiaTransporteCompleto;
	}

	public void setDadosMoradiaTransporteCompleto(boolean dadosMoradiaTransporteCompleto) {
		this.dadosMoradiaTransporteCompleto = dadosMoradiaTransporteCompleto;
	}

	public boolean isInfoFinanceiroCompleto() {
		return infoFinanceiroCompleto;
	}

	public void setInfoFinanceiroCompleto(boolean infoFinanceiroCompleto) {
		this.infoFinanceiroCompleto = infoFinanceiroCompleto;
	}

	public boolean isDadosSaudeDeficienciaCompleto() {
		return dadosSaudeDeficienciaCompleto;
	}

	public void setDadosSaudeDeficienciaCompleto(boolean dadosSaudeDeficienciaCompleto) {
		this.dadosSaudeDeficienciaCompleto = dadosSaudeDeficienciaCompleto;
	}

	public boolean isDadosOutrosAuxiliosCompleto() {
		return dadosOutrosAuxiliosCompleto;
	}

	public void setDadosOutrosAuxiliosCompleto(boolean dadosOutrosAuxiliosCompleto) {
		this.dadosOutrosAuxiliosCompleto = dadosOutrosAuxiliosCompleto;
	}	

	public int getColumnCount() {
		return getClass().getDeclaredFields().length;
	}

	public boolean isCpfValido() {
		return cpfValido;
	}

	public void setCpfValido(boolean cpfValido) {
		this.cpfValido = cpfValido;
	}

	public boolean isMatriculaAtualizada() {
		return matriculaAtualizada;
	}

	public void setMatriculaAtualizada(boolean matriculaAtualizada) {
		this.matriculaAtualizada = matriculaAtualizada;
	}
}
