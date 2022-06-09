import { Aluno } from "./aluno";
import { PeriodoRegistroFrequencia } from "./periodo.registro.frequencia";
import { PeriodoRegistroFrequenciaProjeto } from "./periodo.registro.frequencia.projeto";
import { Projeto } from "./projeto";

export class ExportAluno {
    public totalArquivos;
    public periodosAluno:PeriodoRegistroFrequencia[];
    public projetosValidados:Projeto[];
    public periodosValidados:PeriodoRegistroFrequenciaProjeto[];
    public alunosValidados: Aluno[];
}