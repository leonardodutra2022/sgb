import { Sort } from "./sort";

export class Pageable {
    public sort: Sort;
    public offset: number;
    public pageNumber: number;
    public pageSize: number;
    public paged: boolean;
    public unpaged: boolean;
}