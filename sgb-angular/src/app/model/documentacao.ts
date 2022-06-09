import { Beneficio } from "./beneficio";

export class Documentacao {
    public id;
    public documento : string;
    public descricao : string;
    public obrigatorio : boolean;
    public ativo : boolean;
    public documentoTipo : string;
    public categoria : string;
    public beneficios : Beneficio[];
    public grupoDoc : string;
    public sequencia : number;
}