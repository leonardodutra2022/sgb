import { Aluno } from "./aluno";
import { Horario } from "./horario";
import { Page } from "./pageable/page";
import { Projeto } from "./projeto";

export class FrequenciaRegistro extends Page<FrequenciaRegistro>{
    public id;
    public created: Date;
    public updated: Date;
    public dataReferencia: Date;
    public dataHoraAssinaturaResponsavel: Date;
    public assinaturaResponsavel: boolean;
    public horarios: Horario[];
    public assinaturaAlunoEntrada: boolean;
    public assinaturaAlunoSaida: boolean;
    public compensacaoHoras: boolean;
    public totalMinutos: number;
    public status: string;
    public observacao: string;
    public aluno: Aluno;
    public projeto: Projeto;
    public assinaturaResponsavelCompensacao: boolean;
    public assinaturaAlunoCompensacao: boolean;
    public mesRef: number;
    public anoRef: number;
    public diaRef: number;
    public periodoRef: string;
}