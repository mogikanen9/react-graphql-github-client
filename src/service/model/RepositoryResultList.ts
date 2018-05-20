import { PaginationInfo } from "./PaginationInfo";
import { Repository } from "./Repository";

class RepositoryResultList {
    constructor(readonly repos: Repository[],
        readonly paginationInfo: PaginationInfo) { }
}

export { RepositoryResultList };