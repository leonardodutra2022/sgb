package br.ufc.crateus.sgb.utils.zip;

import java.util.List;
import br.ufc.crateus.sgb.model.Aluno;
import br.ufc.crateus.sgb.model.Projeto;
import br.ufc.crateus.sgb.utils.frequencia.PeriodoFrequenciaAluno;
import br.ufc.crateus.sgb.utils.frequencia.PeriodoFrequenciaProjeto;

public abstract class DadosExport {
	List<Projeto> projetosValidados;
	List<PeriodoFrequenciaProjeto> periodosValidados;
	List<Aluno> alunosValidados;
	int totalArquivos;
	List<PeriodoFrequenciaAluno> periodosAluno;	
}

