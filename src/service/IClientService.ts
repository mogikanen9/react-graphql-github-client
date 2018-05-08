import { RepositoryResultList } from "./model/RepositoryResultList";

interface IClientService {

    listRepos(): Promise<RepositoryResultList>;
}

export { IClientService }