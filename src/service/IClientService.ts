import { RepositoryResultList } from "./model/RepositoryResultList";

interface IClientService {

    listRepos(orgName:string,,itemsPerPage: number, pageCursor?: string): Promise<RepositoryResultList>;
}

export { IClientService }