import { Aluno } from "./aluno";
import { Page } from "./pageable/page";
import { Usuario } from "./usuario";

export class Projeto extends Page<Projeto>{
    public id;
    public titulo: string;
    public descricao: string;
    public totalHoras: number;
    public aluno: Aluno[];
    public responsavel: Usuario;
    public status: string;
}