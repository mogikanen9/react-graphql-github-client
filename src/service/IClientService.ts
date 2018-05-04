import { Repository } from "./model/Repository";

interface IClientService {

    listRepos(): Promise<Repository[]>;
}

export { IClientService }