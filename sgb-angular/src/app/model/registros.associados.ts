import { Entrevista } from "./entrevista";
import { Recurso } from "./recurso";

export interface RegistrosAssociados {
    entrevista : Entrevista;
    recursos : Recurso[];
}