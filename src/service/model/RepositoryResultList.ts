import { Repository } from "./Repository";

class RepositoryResultList {
    constructor(readonly repos: Repository[],
        readonly hasNextPage: boolean,
        readonly pageCursor: string) { }
}

export { RepositoryResultList };