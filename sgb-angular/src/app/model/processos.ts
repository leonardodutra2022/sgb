import { Beneficio } from "./beneficio";

export class Processos {
    public id;
    public dataAbertura;
    public dataEncerramento;
    public statusProcesso;
    public campus;
    public beneficio : Beneficio;
    public ano;
    public vagas;
    public ativo;
    public descricao;
    public possuiEntrevista : boolean;
    public unificado : boolean;
}