package br.ufc.crateus.sgb.utils.frequencia;

import java.util.List;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Projeto;

public abstract class Dados {

	protected String periodoRef;
	
	protected Projeto projeto;
	
	protected Aluno aluno;
	
	protected int mesRef;
	
	protected int anoRef;
	
	protected int diaRef;

	protected List<String> periodosRefAssociados;

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

	public int getDiaRef() {
		return diaRef;
	}

	public void setDiaRef(int diaRef) {
		this.diaRef = diaRef;
	}
}
