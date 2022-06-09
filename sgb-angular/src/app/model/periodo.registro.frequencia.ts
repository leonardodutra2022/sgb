import { Aluno } from "./aluno";
import { DadosPeriodosFrequencia } from "./dados.periodos.frequencia";

export class PeriodoRegistroFrequencia extends DadosPeriodosFrequencia {
    public aluno: Aluno;
    public periodosRefAssociados?: string[];
}