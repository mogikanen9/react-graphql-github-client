interface IClientService {

    listRepos(): Promise<string[]>;
}

export { IClientService }