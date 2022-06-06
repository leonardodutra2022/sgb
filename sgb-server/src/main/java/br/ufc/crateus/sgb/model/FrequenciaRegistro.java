package br.ufc.crateus.sgb.model;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
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
import javax.persistence.OneToMany;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import br.ufc.crateus.sgb.model.enums.FrequenciaEnum;

/**
 *  Entidade representa as informações de frequência do aluno no BIA ou outros programas da universidade 
 *  @author Leonardo Dutra 
 *  @see Aluno  
 */
@Entity
public class FrequenciaRegistro {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;

	@Temporal(TemporalType.TIMESTAMP)
	private Date created;

	@Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
	@Temporal(TemporalType.TIMESTAMP)
	private Date updated;
	
	private LocalDate dataReferencia;

	private Date dataHoraAssinaturaResponsavel;

	private boolean assinaturaResponsavel;
	
	private boolean assinaturaResponsavelCompensacao;
	
	private boolean assinaturaAlunoCompensacao;

	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Horario> horarios;
	
	private boolean assinaturaAlunoEntrada;

	private boolean assinaturaAlunoSaida;

	private boolean compensacaoHoras;

	private int totalMinutos;
	
	@Column(columnDefinition = "varchar(500) default 'nenhuma'")
	private String observacao;

	@Enumerated(EnumType.STRING)
	private FrequenciaEnum status;
	
	@ManyToOne
	private Aluno aluno;
	
	@ManyToOne
	private Projeto projeto;
	
	private int mesRef;
	
	private int anoRef;
	
	private int diaRef;
	
	private String periodoRef;
	
	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Date getCreated() {
		return created;
	}

	public void setCreated(Date created) {
		this.created = created;
	}

	public Date getUpdated() {
		return updated;
	}

	public void setUpdated(Date updated) {
		this.updated = updated;
	}

	public LocalDate getDataReferencia() {
		return dataReferencia;
	}

	public void setDataReferencia(LocalDate dataReferencia) {
		this.dataReferencia = dataReferencia;
	}

	public Date getDataHoraAssinaturaResponsavel() {
		return dataHoraAssinaturaResponsavel;
	}

	public void setDataHoraAssinaturaResponsavel(Date dataHoraAssinaturaResponsavel) {
		this.dataHoraAssinaturaResponsavel = dataHoraAssinaturaResponsavel;
	}

	public boolean isAssinaturaResponsavel() {
		return assinaturaResponsavel;
	}

	public void setAssinaturaResponsavel(boolean assinaturaResponsavel) {
		this.assinaturaResponsavel = assinaturaResponsavel;
	}

	public boolean isAssinaturaAlunoEntrada() {
		return assinaturaAlunoEntrada;
	}

	public void setAssinaturaAlunoEntrada(boolean assinaturaAlunoEntrada) {
		this.assinaturaAlunoEntrada = assinaturaAlunoEntrada;
	}

	public boolean isAssinaturaAlunoSaida() {
		return assinaturaAlunoSaida;
	}

	public void setAssinaturaAlunoSaida(boolean assinaturaAlunoSaida) {
		this.assinaturaAlunoSaida = assinaturaAlunoSaida;
	}

	public boolean isCompensacaoHoras() {
		return compensacaoHoras;
	}

	public void setCompensacaoHoras(boolean compensacaoHoras) {
		this.compensacaoHoras = compensacaoHoras;
	}

	public int getTotalMinutos() {
		return totalMinutos;
	}

	public void setTotalMinutos(int totalMinutos) {
		this.totalMinutos = totalMinutos;
	}

	public FrequenciaEnum getStatus() {
		return status;
	}

	public void setStatus(FrequenciaEnum status) {
		this.status = status;
	}

	public boolean isAssinaturaResponsavelCompensacao() {
		return assinaturaResponsavelCompensacao;
	}

	public void setAssinaturaResponsavelCompensacao(boolean assinaturaResponsavelCompensacao) {
		this.assinaturaResponsavelCompensacao = assinaturaResponsavelCompensacao;
	}

	public boolean isAssinaturaAlunoCompensacao() {
		return assinaturaAlunoCompensacao;
	}

	public void setAssinaturaAlunoCompensacao(boolean assinaturaAlunoCompensacao) {
		this.assinaturaAlunoCompensacao = assinaturaAlunoCompensacao;
	}

	public Projeto getProjeto() {
		return projeto;
	}

	public void setProjeto(Projeto projeto) {
		this.projeto = projeto;
	}

	public int getMesRef() {
		return mesRef;
	}

	public void setMesRef(int mesRef) {
		this.mesRef = mesRef;
	}

	public int getAnoRef() {
		return anoRef;
	}

	public void setAnoRef(int anoRef) {
		this.anoRef = anoRef;
	}

	public String getPeriodoRef() {
		return periodoRef;
	}

	public void setPeriodoRef(String periodoRef) {
		this.periodoRef = periodoRef;
	}

	public int getDiaRef() {
		return diaRef;
	}

	public void setDiaRef(int diaRef) {
		this.diaRef = diaRef;
	}

	public List<Horario> getHorarios() {
		return horarios;
	}

	public void setHorarios(List<Horario> horarios) {
		this.horarios = horarios;
	}
	
}
