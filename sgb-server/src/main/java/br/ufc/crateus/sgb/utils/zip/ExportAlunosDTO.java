package br.ufc.crateus.sgb.utils.zip;

import java.util.List;

import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Projeto;
import br.ufc.crateus.sgb.utils.frequencia.PeriodoFrequenciaAluno;
import br.ufc.crateus.sgb.utils.frequencia.PeriodoFrequenciaProjeto;

public class ExportAlunosDTO extends DadosExport{

	public int getTotalArquivos() {
		return totalArquivos;
	}
	public void setTotalArquivos(int totalArquivos) {
		this.totalArquivos = totalArquivos;
	}
	public List<PeriodoFrequenciaAluno> getPeriodosAluno() {
		return periodosAluno;
	}
	public void setPeriodosAluno(List<PeriodoFrequenciaAluno> periodosAluno) {
		this.periodosAluno = periodosAluno;
	}
	public List<Projeto> getProjetosValidados() {
		return projetosValidados;
	}
	public void setProjetosValidados(List<Projeto> projetosValidados) {
		this.projetosValidados = projetosValidados;
	}
	public List<PeriodoFrequenciaProjeto> getPeriodosValidados() {
		return periodosValidados;
	}
	public void setPeriodosValidados(List<PeriodoFrequenciaProjeto> periodosValidados) {
		this.periodosValidados = periodosValidados;
	}
	public List<Aluno> getAlunosValidados() {
		return alunosValidados;
	}
	public void setAlunosValidados(List<Aluno> alunosValidados) {
		this.alunosValidados = alunosValidados;
	}	
}
