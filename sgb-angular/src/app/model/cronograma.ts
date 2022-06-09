import { Processos } from "./processos";

export class Cronograma {
    public id;
    public dataHora;
    public dataInicio;
    public dataFim;
    public descricaoEvento;
    public st;
    public observacoes;
    public processo : Processos;
}