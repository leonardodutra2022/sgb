import { Subscription } from "./subscription";
import { Processos } from "./processos";

export class ProcessoEtapa {
    public id;
    public concluido : boolean;
    public inscricao : Subscription;
    public processo : Processos;
    public etapa : string;
}