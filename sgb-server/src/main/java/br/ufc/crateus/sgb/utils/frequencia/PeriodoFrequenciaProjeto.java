package br.ufc.crateus.sgb.utils.frequencia;

import br.ufc.crateus.sgb.model.Projeto;

public class PeriodoFrequenciaProjeto extends Dados implements Comparable<PeriodoFrequenciaProjeto>{

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

	public PeriodoFrequenciaProjeto(String periodoRef, Projeto projeto, int mesRef, int anoRef, int diaRef) {
		super();
		this.periodoRef = periodoRef;
		this.projeto = projeto;
		this.mesRef = mesRef;
		this.anoRef = anoRef;
		this.diaRef = diaRef;
	}
	
	public PeriodoFrequenciaProjeto() {
		
	}

	@Override
	public int compareTo(PeriodoFrequenciaProjeto outro) {
		if((this.mesRef < outro.mesRef))
			return -1;
		
		if((this.mesRef > outro.mesRef))
			return 1;

		return 0;
	}
}
