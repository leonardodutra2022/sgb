package br.ufc.crateus.sgb.model;

import java.time.LocalDate;
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

import br.ufc.crateus.sgb.model.abs.Pessoa;
import br.ufc.crateus.sgb.model.enums.EstadoCivilEnum;
import br.ufc.crateus.sgb.model.enums.FormaIngressoEnum;
import br.ufc.crateus.sgb.model.enums.TipoEscolaCursadaEMEnum;

/**
 * Entidade representa as informações do aluno
 * @author Leonardo Dutra
 * @see Logradouro 
 * @see OrgaoExpedidor
 * @see Cidade
 * @see Estado
 * @see Pessoa
 * @see Banco
 * @see EstadoCivilEnum
 * @see TipoEscolaCursadaEMEnum
 * @see FormaIngressoEnum
 */
@Entity
public class Aluno extends Pessoa{
	
	@Id 
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	private String nomeSocial;

	private LocalDate dataNascimento;

	@OneToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	private Logradouro logradouro;
	
	private boolean declaracaoLogradouroAtual;

	private String cnh;

	private String rg;

	@ManyToOne(cascade=CascadeType.REFRESH)
	private OrgaoExpedidor orgaoExpedidorRG;

	@Column(length = 11)
	private String cpf;

	@ManyToOne(cascade=CascadeType.REFRESH)
	private Cidade cidade;
	
	@ManyToOne
	private Estado uf;

	private float rendaFamiliar;

	private String nomeMae;

	private String nomePai;

	private boolean maeViuva;

	private boolean paiViuvo;

	@Column(length=3)
	private int quantasPessoasFamilia;

	private String naturalidade;

	private String nacionalidade;

	@Column(length=2)
	private int numFilhos;

	private boolean possueGuardaFilho;

	@Column(length=3)
	private int idadeFilhoMaisNovo;

	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date ultimaAtualizacaoCadastral;

	private boolean situacaoVulnerabilidadeEconomica;

	@ManyToOne(cascade = CascadeType.REFRESH)
	private Banco banco;

	@Column(length=50)
	private String contaCorrente;

	@Column(length=10)
	private String numAgencia;
	
	@Column(length=5)
	private String operadorCef;

	private String cidadeAgencia;

	@Enumerated(EnumType.STRING)
	private EstadoCivilEnum estadoCivil;

	private String telefoneFixo;

	@Column(length=15)
	private String celularA;

	@Column(length=15)
	private String celularB;
    
	@OneToOne(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	private Logradouro logradouroMoradiaFamilia;

	@Enumerated(EnumType.STRING)
	private TipoEscolaCursadaEMEnum tipoEscolaEnsinoMedio;

	private boolean bolsistaEscolaParticular;

	private float percentualBolsa;

	@Enumerated(EnumType.STRING)
	private FormaIngressoEnum formaIngresso;

	@Column(length=100)
	private String outraFormaIngresso;

	private boolean outraGraduacao;

	private String cursoOutraGraduacao;

	private String ies;

	private int anoConclusao;

	private boolean usoContinuoMedicacao;

	private String doenca;

	private boolean possuiDeficiencia;

	private String deficiencia;

	private boolean doencaGraveMembroFamiliar;

	private String qualDoencaGraveMembroFamiliar;

	private boolean deficienciaMembroFamiliar;

	private String qualDeficienciaMembroFamiliar;

	private boolean familiaPossuiPlanoAssisMedica;

	private float valorAssisMedica;
    
	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date dataHora;
	
	private String obsAcad;
	
	private String cursoAtual;
	
	private String semestreCursoAtual;
	
	private String periodoLetivoAtual;
	
	private float totalCreditosUltimo;
	
	private float creditosAprovadosUltimo;
	
	private float iraAtual;
	
	private float iraIndividual;
	
	public Aluno() {
		
	}
	
	public byte[] getRubrica() {
		return this.rubrica;
	}
	
	public void setRubrica(byte[] rubrica) {
		this.rubrica = rubrica;
	}
	
	public float getIraAtual() {
		return iraAtual;
	}

	public void setIraAtual(float iraAtual) {
		this.iraAtual = iraAtual;
	}

	public float getIraIndividual() {
		return iraIndividual;
	}

	public void setIraIndividual(float iraIndividual) {
		this.iraIndividual = iraIndividual;
	}

	public String getPeriodoLetivoAtual() {
		return periodoLetivoAtual;
	}

	public void setPeriodoLetivoAtual(String periodoLetivoAtual) {
		this.periodoLetivoAtual = periodoLetivoAtual;
	}

	public float getTotalCreditosUltimo() {
		return totalCreditosUltimo;
	}

	public void setTotalCreditosUltimo(float totalCreditosUltimo) {
		this.totalCreditosUltimo = totalCreditosUltimo;
	}

	public float getCreditosAprovadosUltimo() {
		return creditosAprovadosUltimo;
	}

	public void setCreditosAprovadosUltimo(float creditosAprovadosUltimo) {
		this.creditosAprovadosUltimo = creditosAprovadosUltimo;
	}

	public String getSemestreCursoAtual() {
		return semestreCursoAtual;
	}

	public void setSemestreCursoAtual(String semestreCursoAtual) {
		this.semestreCursoAtual = semestreCursoAtual;
	}

	public String getCursoAtual() {
		return cursoAtual;
	}

	public void setCursoAtual(String cursoAtual) {
		this.cursoAtual = cursoAtual;
	}

	public String getObsAcad() {
		return obsAcad;
	}

	public void setObsAcad(String obsAcad) {
		this.obsAcad = obsAcad;
	}

	public String getNomeSocial() {
		return nomeSocial;
	}

	public void setNomeSocial(String nomeSocial) {
		this.nomeSocial = nomeSocial;
	}

	public Logradouro getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(Logradouro logradouro) {
		this.logradouro = logradouro;
	}

	public String getCnh() {
		return cnh;
	}

	public void setCnh(String cnh) {
		this.cnh = cnh;
	}

	public String getRg() {
		return rg;
	}

	public void setRg(String rg) {
		this.rg = rg;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public float getRendaFamiliar() {
		return rendaFamiliar;
	}

	public void setRendaFamiliar(float rendaFamiliar) {
		this.rendaFamiliar = rendaFamiliar;
	}

	public String getNomeMae() {
		return nomeMae;
	}

	public void setNomeMae(String nomeMae) {
		this.nomeMae = nomeMae;
	}

	public String getNomePai() {
		return nomePai;
	}

	public void setNomePai(String nomePai) {
		this.nomePai = nomePai;
	}

	public boolean isMaeViuva() {
		return maeViuva;
	}

	public void setMaeViuva(boolean maeViuva) {
		this.maeViuva = maeViuva;
	}

	public boolean isPaiViuvo() {
		return paiViuvo;
	}

	public void setPaiViuvo(boolean paiViuvo) {
		this.paiViuvo = paiViuvo;
	}

	public int getQuantasPessoasFamilia() {
		return quantasPessoasFamilia;
	}

	public void setQuantasPessoasFamilia(int quantasPessoasFamilia) {
		this.quantasPessoasFamilia = quantasPessoasFamilia;
	}

	public String getNaturalidade() {
		return naturalidade;
	}

	public void setNaturalidade(String naturalidade) {
		this.naturalidade = naturalidade;
	}

	public String getNacionalidade() {
		return nacionalidade;
	}

	public void setNacionalidade(String nacionalidade) {
		this.nacionalidade = nacionalidade;
	}

	public int getNumFilhos() {
		return numFilhos;
	}

	public void setNumFilhos(int numFilhos) {
		this.numFilhos = numFilhos;
	}

	public boolean isPossueGuardaFilho() {
		return possueGuardaFilho;
	}

	public void setPossueGuardaFilho(boolean possueGuardaFilho) {
		this.possueGuardaFilho = possueGuardaFilho;
	}

	public int getIdadeFilhoMaisNovo() {
		return idadeFilhoMaisNovo;
	}

	public void setIdadeFilhoMaisNovo(int idadeFilhoMaisNovo) {
		this.idadeFilhoMaisNovo = idadeFilhoMaisNovo;
	}

	public Date getUltimaAtualizacaoCadastral() {
		return ultimaAtualizacaoCadastral;
	}

	public void setUltimaAtualizacaoCadastral(Date ultimaAtualizacaoCadastral) {
		this.ultimaAtualizacaoCadastral = ultimaAtualizacaoCadastral;
	}

	public boolean isSituacaoVulnerabilidadeEconomica() {
		return situacaoVulnerabilidadeEconomica;
	}

	public void setSituacaoVulnerabilidadeEconomica(boolean situacaoVulnerabilidadeEconomica) {
		this.situacaoVulnerabilidadeEconomica = situacaoVulnerabilidadeEconomica;
	}

	public String getContaCorrente() {
		return contaCorrente;
	}

	public void setContaCorrente(String contaCorrente) {
		this.contaCorrente = contaCorrente;
	}

	public String getNumAgencia() {
		return numAgencia;
	}

	public void setNumAgencia(String numAgencia) {
		this.numAgencia = numAgencia;
	}

	public String getOperadorCef() {
		return operadorCef;
	}

	public void setOperadorCef(String operadorCef) {
		this.operadorCef = operadorCef;
	}

	public String getCidadeAgencia() {
		return cidadeAgencia;
	}

	public void setCidadeAgencia(String cidadeAgencia) {
		this.cidadeAgencia = cidadeAgencia;
	}

	public EstadoCivilEnum getEstadoCivil() {
		return estadoCivil;
	}

	public void setEstadoCivil(EstadoCivilEnum estadoCivil) {
		this.estadoCivil = estadoCivil;
	}

	public String getTelefoneFixo() {
		return telefoneFixo;
	}

	public void setTelefoneFixo(String telefoneFixo) {
		this.telefoneFixo = telefoneFixo;
	}

	public String getCelularA() {
		return celularA;
	}

	public void setCelularA(String celularA) {
		this.celularA = celularA;
	}

	public String getCelularB() {
		return celularB;
	}

	public void setCelularB(String celularB) {
		this.celularB = celularB;
	}

	public Logradouro getLogradouroMoradiaFamilia() {
		return logradouroMoradiaFamilia;
	}

	public void setLogradouroMoradiaFamilia(Logradouro logradouroMoradiaFamilia) {
		this.logradouroMoradiaFamilia = logradouroMoradiaFamilia;
	}

	public TipoEscolaCursadaEMEnum getTipoEscolaEnsinoMedio() {
		return tipoEscolaEnsinoMedio;
	}

	public void setTipoEscolaEnsinoMedio(TipoEscolaCursadaEMEnum tipoEscolaEnsinoMedio) {
		this.tipoEscolaEnsinoMedio = tipoEscolaEnsinoMedio;
	}

	public boolean isBolsistaEscolaParticular() {
		return bolsistaEscolaParticular;
	}

	public void setBolsistaEscolaParticular(boolean bolsistaEscolaParticular) {
		this.bolsistaEscolaParticular = bolsistaEscolaParticular;
	}

	public float getPercentualBolsa() {
		return percentualBolsa;
	}

	public void setPercentualBolsa(float percentualBolsa) {
		this.percentualBolsa = percentualBolsa;
	}

	public FormaIngressoEnum getFormaIngresso() {
		return formaIngresso;
	}

	public void setFormaIngresso(FormaIngressoEnum formaIngresso) {
		this.formaIngresso = formaIngresso;
	}

	public String getOutraFormaIngresso() {
		return outraFormaIngresso;
	}

	public void setOutraFormaIngresso(String outraFormaIngresso) {
		this.outraFormaIngresso = outraFormaIngresso;
	}

	public boolean isOutraGraduacao() {
		return outraGraduacao;
	}

	public void setOutraGraduacao(boolean outraGraduacao) {
		this.outraGraduacao = outraGraduacao;
	}

	public String getCursoOutraGraduacao() {
		return cursoOutraGraduacao;
	}

	public void setCursoOutraGraduacao(String cursoOutraGraduacao) {
		this.cursoOutraGraduacao = cursoOutraGraduacao;
	}

	public String getIes() {
		return ies;
	}

	public void setIes(String ies) {
		this.ies = ies;
	}

	public int getAnoConclusao() {
		return anoConclusao;
	}

	public void setAnoConclusao(int anoConclusao) {
		this.anoConclusao = anoConclusao;
	}

	public boolean isUsoContinuoMedicacao() {
		return usoContinuoMedicacao;
	}

	public void setUsoContinuoMedicacao(boolean usoContinuoMedicacao) {
		this.usoContinuoMedicacao = usoContinuoMedicacao;
	}

	public String getDoenca() {
		return doenca;
	}

	public void setDoenca(String doenca) {
		this.doenca = doenca;
	}

	public boolean isPossuiDeficiencia() {
		return possuiDeficiencia;
	}

	public void setPossuiDeficiencia(boolean possuiDeficiencia) {
		this.possuiDeficiencia = possuiDeficiencia;
	}

	public String getDeficiencia() {
		return deficiencia;
	}

	public void setDeficiencia(String deficiencia) {
		this.deficiencia = deficiencia;
	}

	public boolean isDoencaGraveMembroFamiliar() {
		return doencaGraveMembroFamiliar;
	}

	public void setDoencaGraveMembroFamiliar(boolean doencaGraveMembroFamiliar) {
		this.doencaGraveMembroFamiliar = doencaGraveMembroFamiliar;
	}

	public String getQualDoencaGraveMembroFamiliar() {
		return qualDoencaGraveMembroFamiliar;
	}

	public void setQualDoencaGraveMembroFamiliar(String qualDoencaGraveMembroFamiliar) {
		this.qualDoencaGraveMembroFamiliar = qualDoencaGraveMembroFamiliar;
	}

	public boolean isDeficienciaMembroFamiliar() {
		return deficienciaMembroFamiliar;
	}

	public void setDeficienciaMembroFamiliar(boolean deficienciaMembroFamiliar) {
		this.deficienciaMembroFamiliar = deficienciaMembroFamiliar;
	}

	public String getQualDeficienciaMembroFamiliar() {
		return qualDeficienciaMembroFamiliar;
	}

	public void setQualDeficienciaMembroFamiliar(String qualDeficienciaMembroFamiliar) {
		this.qualDeficienciaMembroFamiliar = qualDeficienciaMembroFamiliar;
	}

	public boolean isFamiliaPossuiPlanoAssisMedica() {
		return familiaPossuiPlanoAssisMedica;
	}

	public void setFamiliaPossuiPlanoAssisMedica(boolean familiaPossuiPlanoAssisMedica) {
		this.familiaPossuiPlanoAssisMedica = familiaPossuiPlanoAssisMedica;
	}

	public float getValorAssisMedica() {
		return valorAssisMedica;
	}

	public void setValorAssisMedica(float valorAssisMedica) {
		this.valorAssisMedica = valorAssisMedica;
	}     

	public Date getDataHora() {
		return dataHora;
	}

	public void setDataHora(Date dataHora) {
		this.dataHora = dataHora;
	}
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}
	
	public String getNomeCompleto() {
		return nomeCompleto;
	}
	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}
	public String getSexo() {
		return sexo;
	}
	public void setSexo(String sexo) {
		this.sexo = sexo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}

	public LocalDate getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(LocalDate dataNascimento) {
		this.dataNascimento = dataNascimento;
	}
	
	public Long getSiape() {
		return siape;
	}
	public void setSiape(Long siape) {
		this.siape = siape;
	}

	public OrgaoExpedidor getOrgaoExpedidorRG() {
		return orgaoExpedidorRG;
	}

	public void setOrgaoExpedidorRG(OrgaoExpedidor orgaoExpedidorRG) {
		this.orgaoExpedidorRG = orgaoExpedidorRG;
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

	public Banco getBanco() {
		return banco;
	}

	public void setBanco(Banco banco) {
		this.banco = banco;
	}

	public boolean isDeclaracaoLogradouroAtual() {
		return declaracaoLogradouroAtual;
	}

	public void setDeclaracaoLogradouroAtual(boolean declaracaoLogradouroAtual) {
		this.declaracaoLogradouroAtual = declaracaoLogradouroAtual;
	}

}
