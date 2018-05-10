import { RepositoryResultList } from "./model/RepositoryResultList";

interface IClientService {

    listRepos(itemsPerPage:number, pageCursor?:string): Promise<RepositoryResultList>;
}

export { IClientService }