import { Processos } from "./processos";
import { Aluno } from "./aluno";

export class Concessao {
    public id;
    public concessaoStatus;
    public dataConcessao;
    public dataConcessaoFinal;
    public aluno : Aluno;
    public beneficio;
    public dataHora;
    public processo : Processos;
}