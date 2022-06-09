import { Recurso } from "./recurso";
import { Entrevista } from "./entrevista";
import { RegistrosAssociados } from "./registros.associados";
import { Processos } from "./processos";

export class SubscriptionCustom {
    codInscricao: number;
    dataHoraInscricao: any;
    statusInscricao: string;
    statusInscricaoFinal : string;
    analiseComissao: string;
    codProcesso: number;
    processo : Processos;
    statusProcesso: string;
    statusProcessoResume : string;
    codAluno: number;
    anoProcesso: number;
    recursosInscricao: Recurso[];
    entrevista: Entrevista;
    outrosRegistros: RegistrosAssociados;
    pendenciaDoc : boolean;
    pendenciaDados : boolean;
    pendenciaDocObs : string;
    pendenciaDadosObs : string;
    formDados : string;
}
