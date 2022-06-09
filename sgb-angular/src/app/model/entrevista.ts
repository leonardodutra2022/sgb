import { Subscription } from "./subscription";
import { Processos } from "./processos";


export class Entrevista {
    public id;
    public processo : Processos;
    public inscricao : Subscription;
    public membroComissao;
    public parecerMembroComissao;
    public parecerFinal;
    public data;
    public dataRegistro : Date;
    public hora;
    public localEntrevista;
    public observacoes;
    public relatorio;
}