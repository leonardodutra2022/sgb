	package br.ufc.crateus.sgb.model;

import java.io.Serializable;
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

import br.ufc.crateus.sgb.model.enums.MoradiaTipoEnum;
import br.ufc.crateus.sgb.model.enums.SituacaoImovelEnum;
import br.ufc.crateus.sgb.model.enums.StatusEnum;
import br.ufc.crateus.sgb.model.enums.TransporteEnum;
import br.ufc.crateus.sgb.utils.AbstractTypeReference;

/**
 * Entidade representa as informações de inscrições efetuadas em cada processo por cada aluno, contém informações importantes, mas específicas a cada inscrição, por razão temporal.
 * @author Leonardo Dutra
 * @see AbstractTypeReference 
 * @see Inscricao
 * @see StatusEnum
 * @see Aluno
 * @see Processo
 * @see SituacaoImovelEnum
 * @see MoradiaTipoEnum
 * @see TransporteEnum
 */
@Entity
public class Inscricao implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	public Inscricao() {
		
	}	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataHoraInscricao;

	@Enumerated(EnumType.STRING)
	private StatusEnum situacao;
	
	@Enumerated(EnumType.STRING)
	private StatusEnum situacaoFinal;	

	@ManyToOne(cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
	private Aluno aluno;
	
	@OneToOne
	private Processo processo;
	
	@Enumerated(EnumType.STRING)
	private SituacaoImovelEnum situacaoMoradiaImovel;

	private boolean moradiaRural;

	private float valorMensalFinanciamento;
	
	@Enumerated(EnumType.STRING)
	private MoradiaTipoEnum tipoMoradia;
	
	@Enumerated(EnumType.STRING)
	private SituacaoImovelEnum situacaoMoradiaImovelFamiliar;

	private boolean moradiaRuralFamiliar;

	private float valorMensalFinanciamentoFamiliar;
	
	@Enumerated(EnumType.STRING)
	private TransporteEnum meioTransporte;

	private float valorGastoDiariamenteTransporte;

	private float tempoGastoDeslocamento;

	private boolean bolsista;

	private String tipoBolsa;
	
	private float valorOutraBolsa;

	private boolean estagiario;

	private String ondeFazEstagio;

	private boolean trabalhaFormalmente;

	private String cargo;

	private String empresa;

	private boolean acompPsiPrae;

	private boolean acompNutri;

	private boolean ajudaCustoEventoCientificoPrae;

	private boolean auxCrechePrae;

	private boolean auxEmergPrae;

	private boolean auxMoradiaPrae;

	private boolean bolsaIniAcadPrae;

	private boolean bolsaDesportoPrae;

	private boolean isencaoRUPrae;
	
	private float rendaMensal;
	
	private boolean possuiOutraAtividadeRemunerada;
	
	private String outraAtividadeRemunerada;
	
	private float rendaOutraAtividade;

	@Column(length = 1500)
	private String relatoFamiliar;
	
	private boolean declaracaoVeracidade;
	
	private boolean genitor;
	
	private boolean dadosBasicosValidado;
	
	private boolean enderecoContatoValidado;
	
	private boolean dadosBancariosValidado;
	
	private boolean nucleoFamiliarValidado;
	
	private boolean auxBolsasValidado;
	
	private boolean infoFinanceirasValidado;
	
	private boolean moradiaValidado;
	
	private boolean transporteValidado;
	
	private boolean saudeDeficienciaValidado;
	
	private boolean infoAcadValidado;
	
	private boolean documentacaoValidado;
	
	public boolean isDadosBasicosValidado() {
		return dadosBasicosValidado;
	}

	public void setDadosBasicosValidado(boolean dadosBasicosValidado) {
		this.dadosBasicosValidado = dadosBasicosValidado;
	}

	public boolean isEnderecoContatoValidado() {
		return enderecoContatoValidado;
	}

	public void setEnderecoContatoValidado(boolean enderecoContatoValidado) {
		this.enderecoContatoValidado = enderecoContatoValidado;
	}

	public boolean isDadosBancariosValidado() {
		return dadosBancariosValidado;
	}

	public void setDadosBancariosValidado(boolean dadosBancariosValidado) {
		this.dadosBancariosValidado = dadosBancariosValidado;
	}

	public boolean isNucleoFamiliarValidado() {
		return nucleoFamiliarValidado;
	}

	public void setNucleoFamiliarValidado(boolean nucleoFamiliarValidado) {
		this.nucleoFamiliarValidado = nucleoFamiliarValidado;
	}

	public boolean isAuxBolsasValidado() {
		return auxBolsasValidado;
	}

	public void setAuxBolsasValidado(boolean auxBolsasValidado) {
		this.auxBolsasValidado = auxBolsasValidado;
	}

	public boolean isInfoFinanceirasValidado() {
		return infoFinanceirasValidado;
	}

	public void setInfoFinanceirasValidado(boolean infoFinanceirasValidado) {
		this.infoFinanceirasValidado = infoFinanceirasValidado;
	}

	public boolean isMoradiaValidado() {
		return moradiaValidado;
	}

	public void setMoradiaValidado(boolean moradiaValidado) {
		this.moradiaValidado = moradiaValidado;
	}

	public boolean isTransporteValidado() {
		return transporteValidado;
	}

	public void setTransporteValidado(boolean transporteValidado) {
		this.transporteValidado = transporteValidado;
	}

	public boolean isSaudeDeficienciaValidado() {
		return saudeDeficienciaValidado;
	}

	public void setSaudeDeficienciaValidado(boolean saudeDeficienciaValidado) {
		this.saudeDeficienciaValidado = saudeDeficienciaValidado;
	}

	public boolean isInfoAcadValidado() {
		return infoAcadValidado;
	}

	public void setInfoAcadValidado(boolean infoAcadValidado) {
		this.infoAcadValidado = infoAcadValidado;
	}

	public boolean isDocumentacaoValidado() {
		return documentacaoValidado;
	}

	public void setDocumentacaoValidado(boolean documentacaoValidado) {
		this.documentacaoValidado = documentacaoValidado;
	}

	@Column(length = 1500)
	private String analiseComissao;
	
	@Column(length = 1500)
	private String analiseComissaoFinal;

	public boolean isGenitor() {
		return genitor;
	}

	public void setGenitor(boolean genitor) {
		this.genitor = genitor;
	}

	public Date getDataHoraInscricao() {
		return dataHoraInscricao;
	}

	public void setDataHoraInscricao(Date dataHoraInscricao) {
		this.dataHoraInscricao = dataHoraInscricao;
	}

	public MoradiaTipoEnum getTipoMoradia() {
		return tipoMoradia;
	}

	public void setTipoMoradia(MoradiaTipoEnum tipoMoradia) {
		this.tipoMoradia = tipoMoradia;
	}

	public SituacaoImovelEnum getSituacaoMoradiaImovel() {
		return situacaoMoradiaImovel;
	}

	public void setSituacaoMoradiaImovel(SituacaoImovelEnum situacaoMoradiaImovel) {
		this.situacaoMoradiaImovel = situacaoMoradiaImovel;
	}

	public boolean isMoradiaRural() {
		return moradiaRural;
	}

	public void setMoradiaRural(boolean moradiaRural) {
		this.moradiaRural = moradiaRural;
	}

	public float getValorMensalFinanciamento() {
		return valorMensalFinanciamento;
	}

	public void setValorMensalFinanciamento(float valorMensalFinanciamento) {
		this.valorMensalFinanciamento = valorMensalFinanciamento;
	}

	public TransporteEnum getMeioTransporte() {
		return meioTransporte;
	}

	public void setMeioTransporte(TransporteEnum meioTransporte) {
		this.meioTransporte = meioTransporte;
	}

	public float getValorGastoDiariamenteTransporte() {
		return valorGastoDiariamenteTransporte;
	}

	public void setValorGastoDiariamenteTransporte(float valorGastoDiariamenteTransporte) {
		this.valorGastoDiariamenteTransporte = valorGastoDiariamenteTransporte;
	}

	public float getTempoGastoDeslocamento() {
		return tempoGastoDeslocamento;
	}

	public void setTempoGastoDeslocamento(float tempoGastoDeslocamento) {
		this.tempoGastoDeslocamento = tempoGastoDeslocamento;
	}

	public boolean isBolsista() {
		return bolsista;
	}

	public void setBolsista(boolean bolsista) {
		this.bolsista = bolsista;
	}

	public String getTipoBolsa() {
		return tipoBolsa;
	}

	public void setTipoBolsa(String tipoBolsa) {
		this.tipoBolsa = tipoBolsa;
	}

	public boolean isEstagiario() {
		return estagiario;
	}

	public void setEstagiario(boolean estagiario) {
		this.estagiario = estagiario;
	}

	public String getOndeFazEstagio() {
		return ondeFazEstagio;
	}

	public void setOndeFazEstagio(String ondeFazEstagio) {
		this.ondeFazEstagio = ondeFazEstagio;
	}

	public boolean isTrabalhaFormalmente() {
		return trabalhaFormalmente;
	}

	public void setTrabalhaFormalmente(boolean trabalhaFormalmente) {
		this.trabalhaFormalmente = trabalhaFormalmente;
	}

	public String getCargo() {
		return cargo;
	}

	public void setCargo(String cargo) {
		this.cargo = cargo;
	}

	public String getEmpresa() {
		return empresa;
	}

	public void setEmpresa(String empresa) {
		this.empresa = empresa;
	}

	public boolean isAcompPsiPrae() {
		return acompPsiPrae;
	}

	public void setAcompPsiPrae(boolean acompPsiPrae) {
		this.acompPsiPrae = acompPsiPrae;
	}

	public boolean isAcompNutri() {
		return acompNutri;
	}

	public void setAcompNutri(boolean acompNutri) {
		this.acompNutri = acompNutri;
	}

	public boolean isAjudaCustoEventoCientificoPrae() {
		return ajudaCustoEventoCientificoPrae;
	}

	public void setAjudaCustoEventoCientificoPrae(boolean ajudaCustoEventoCientificoPrae) {
		this.ajudaCustoEventoCientificoPrae = ajudaCustoEventoCientificoPrae;
	}

	public boolean isAuxCrechePrae() {
		return auxCrechePrae;
	}

	public void setAuxCrechePrae(boolean auxCrechePrae) {
		this.auxCrechePrae = auxCrechePrae;
	}

	public boolean isAuxEmergPrae() {
		return auxEmergPrae;
	}

	public void setAuxEmergPrae(boolean auxEmergPrae) {
		this.auxEmergPrae = auxEmergPrae;
	}

	public boolean isAuxMoradiaPrae() {
		return auxMoradiaPrae;
	}

	public void setAuxMoradiaPrae(boolean auxMoradiaPrae) {
		this.auxMoradiaPrae = auxMoradiaPrae;
	}

	public boolean isBolsaIniAcadPrae() {
		return bolsaIniAcadPrae;
	}

	public void setBolsaIniAcadPrae(boolean bolsaIniAcadPrae) {
		this.bolsaIniAcadPrae = bolsaIniAcadPrae;
	}

	public boolean isBolsaDesportoPrae() {
		return bolsaDesportoPrae;
	}

	public void setBolsaDesportoPrae(boolean bolsaDesportoPrae) {
		this.bolsaDesportoPrae = bolsaDesportoPrae;
	}

	public boolean isIsencaoRUPrae() {
		return isencaoRUPrae;
	}

	public void setIsencaoRUPrae(boolean isencaoRUPrae) {
		this.isencaoRUPrae = isencaoRUPrae;
	}

	public String getRelatoFamiliar() {
		return relatoFamiliar;
	}

	public void setRelatoFamiliar(String relatoFamiliar) {
		this.relatoFamiliar = relatoFamiliar;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public StatusEnum getSituacao() {
		return situacao;
	}

	public void setSituacao(StatusEnum situacao) {
		this.situacao = situacao;
	}

	public Processo getProcesso() {
		return processo;
	}

	public void setProcesso(Processo processo) {
		this.processo = processo;
	}

	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}

	public float getRendaMensal() {
		return rendaMensal;
	}

	public void setRendaMensal(float rendaMensal) {
		this.rendaMensal = rendaMensal;
	}

	public boolean isDeclaracaoVeracidade() {
		return declaracaoVeracidade;
	}

	public void setDeclaracaoVeracidade(boolean declaracaoVeracidade) {
		this.declaracaoVeracidade = declaracaoVeracidade;
	}

	public SituacaoImovelEnum getSituacaoMoradiaImovelFamiliar() {
		return situacaoMoradiaImovelFamiliar;
	}

	public void setSituacaoMoradiaImovelFamiliar(SituacaoImovelEnum situacaoMoradiaImovelFamiliar) {
		this.situacaoMoradiaImovelFamiliar = situacaoMoradiaImovelFamiliar;
	}

	public boolean isMoradiaRuralFamiliar() {
		return moradiaRuralFamiliar;
	}

	public void setMoradiaRuralFamiliar(boolean moradiaRuralFamiliar) {
		this.moradiaRuralFamiliar = moradiaRuralFamiliar;
	}

	public float getValorMensalFinanciamentoFamiliar() {
		return valorMensalFinanciamentoFamiliar;
	}

	public void setValorMensalFinanciamentoFamiliar(float valorMensalFinanciamentoFamiliar) {
		this.valorMensalFinanciamentoFamiliar = valorMensalFinanciamentoFamiliar;
	}

	public String getOutraAtividadeRemunerada() {
		return outraAtividadeRemunerada;
	}

	public void setOutraAtividadeRemunerada(String outraAtividadeRemunerada) {
		this.outraAtividadeRemunerada = outraAtividadeRemunerada;
	}

	public float getRendaOutraAtividade() {
		return rendaOutraAtividade;
	}

	public void setRendaOutraAtividade(float rendaOutraAtividade) {
		this.rendaOutraAtividade = rendaOutraAtividade;
	}

	public String getAnaliseComissao() {
		return analiseComissao;
	}

	public void setAnaliseComissao(String analiseComissao) {
		this.analiseComissao = analiseComissao;
	}

	public boolean isPossuiOutraAtividadeRemunerada() {
		return possuiOutraAtividadeRemunerada;
	}

	public void setPossuiOutraAtividadeRemunerada(boolean possuiOutraAtividadeRemunerada) {
		this.possuiOutraAtividadeRemunerada = possuiOutraAtividadeRemunerada;
	}

	public float getValorOutraBolsa() {
		return valorOutraBolsa;
	}

	public void setValorOutraBolsa(float valorOutraBolsa) {
		this.valorOutraBolsa = valorOutraBolsa;
	}

	public StatusEnum getSituacaoFinal() {
		return situacaoFinal;
	}

	public void setSituacaoFinal(StatusEnum situacaoFinal) {
		this.situacaoFinal = situacaoFinal;
	}

	public String getAnaliseComissaoFinal() {
		return analiseComissaoFinal;
	}

	public void setAnaliseComissaoFinal(String analiseComissaoFinal) {
		this.analiseComissaoFinal = analiseComissaoFinal;
	}
	
}
