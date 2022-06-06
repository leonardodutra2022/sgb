package br.ufc.crateus.sgb.model.page.criteria;

import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Projeto;

public class FrequenciaRegistroCriteria {
	
	private Projeto projeto;
	private Aluno aluno;
	private int mesRef;
	private int anoRef;
	
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

}
