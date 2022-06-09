import { Pageable } from "./pageable";

export class Page<T> {
    public content: T[];
    public pageable: Pageable;
    public last: boolean;
    public totalPages: number;
    public totalElements: number;
    public size: number;
    public number: number;
    public sort: number;
    public numberOfElements: number;
    public first: boolean;
}