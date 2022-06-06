package br.ufc.crateus.sgb.model.dto;

public class InscricaoDTO {

	private int i;
	private Long alunoId;
	private String nomeCompleto;
	private Long matricula;
	private String cpf;
	private String cursoAtual;
	private boolean existInscricao;
	private boolean existRecurso;
	private boolean iValidacao;
	private Long processoId;
	private Long inscricaoId;
	private String situacaoInscricao;
	private String situacaoFinalInscricao;
	
	public InscricaoDTO() {
		
	}

	public InscricaoDTO(Long alunoId, String nomeCompleto, Long matricula, String cpf, String cursoAtual,
			boolean existInscricao, boolean existRecurso, boolean iValidacao, Long processoId, Long inscricaoId,
			String situacaoInscricao, String situacaoFinalInscricao, int i) {
		super();
		this.alunoId = alunoId;
		this.nomeCompleto = nomeCompleto;
		this.matricula = matricula;
		this.cpf = cpf;
		this.cursoAtual = cursoAtual;
		this.existInscricao = existInscricao;
		this.existRecurso = existRecurso;
		this.iValidacao = iValidacao;
		this.processoId = processoId;
		this.inscricaoId = inscricaoId;
		this.situacaoInscricao = situacaoInscricao;
		this.situacaoFinalInscricao = situacaoFinalInscricao;
		this.i = i;
	}

	public Long getAlunoId() {
		return alunoId;
	}

	public void setAlunoId(Long alunoId) {
		this.alunoId = alunoId;
	}

	public String getNomeCompleto() {
		return nomeCompleto;
	}

	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}

	public Long getMatricula() {
		return matricula;
	}

	public void setMatricula(Long matricula) {
		this.matricula = matricula;
	}

	public String getCpf() {
		return cpf;
	}

	public void setCpf(String cpf) {
		this.cpf = cpf;
	}

	public String getCursoAtual() {
		return cursoAtual;
	}

	public void setCursoAtual(String cursoAtual) {
		this.cursoAtual = cursoAtual;
	}

	public boolean isExistInscricao() {
		return existInscricao;
	}

	public void setExistInscricao(boolean existInscricao) {
		this.existInscricao = existInscricao;
	}

	public boolean isExistRecurso() {
		return existRecurso;
	}

	public void setExistRecurso(boolean existRecurso) {
		this.existRecurso = existRecurso;
	}

	public boolean isiValidacao() {
		return iValidacao;
	}

	public void setiValidacao(boolean iValidacao) {
		this.iValidacao = iValidacao;
	}

	public Long getProcessoId() {
		return processoId;
	}

	public void setProcessoId(Long processoId) {
		this.processoId = processoId;
	}

	public Long getInscricaoId() {
		return inscricaoId;
	}

	public void setInscricaoId(Long inscricaoId) {
		this.inscricaoId = inscricaoId;
	}

	public String getSituacaoInscricao() {
		return situacaoInscricao;
	}

	public void setSituacaoInscricao(String situacaoInscricao) {
		this.situacaoInscricao = situacaoInscricao;
	}

	public String getSituacaoFinalInscricao() {
		return situacaoFinalInscricao;
	}

	public void setSituacaoFinalInscricao(String situacaoFinalInscricao) {
		this.situacaoFinalInscricao = situacaoFinalInscricao;
	}

	public int getI() {
		return i;
	}

	public void setI(int i) {
		this.i = i;
	}

}
