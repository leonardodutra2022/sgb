package br.ufc.crateus.sgb.utils.frequencia;

import java.util.List;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Projeto;

public class PeriodoFrequenciaAluno extends Dados{

	public String getPeriodoRef() {
		return periodoRef;
	}

	public void setPeriodoRef(String periodoRef) {
		this.periodoRef = periodoRef;
	}

	public Projeto getProjeto() {
		return projeto;
	}

	public void setProjeto(Projeto projeto) {
		this.projeto = projeto;
	}

	public Aluno getAluno() {
		return aluno;
	}

	public void setAluno(Aluno aluno) {
		this.aluno = aluno;
	}

	public PeriodoFrequenciaAluno(String periodoRef, Projeto projeto, Aluno aluno, int mesRef, int anoRef, int diaRef) {
		super();
		this.periodoRef = periodoRef;
		this.projeto = projeto;
		this.aluno = aluno;
		this.mesRef = mesRef;
		this.anoRef = anoRef;
		this.diaRef = diaRef;
	}
	
	public PeriodoFrequenciaAluno() {
		
	}
	
	public PeriodoFrequenciaAluno(Aluno aluno, List<String> periodosVinculados, Projeto projeto) {
		super();
		this.aluno = aluno;
		this.periodosRefAssociados = periodosVinculados;
		this.projeto = projeto;
	}
	
	public List<String> getPeriodosRefAssociados() {
		return periodosRefAssociados;
	}

	public void setPeriodosRefAssociados(List<String> periodosRefAssociados) {
		this.periodosRefAssociados = periodosRefAssociados;
	}
}
