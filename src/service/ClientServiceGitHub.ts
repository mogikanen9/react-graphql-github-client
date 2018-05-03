import { IClientService } from "./IClientService";

class ClientServiceGitHub implements IClientService {

    public listRepos(): Promise<string[]> {
        return new Promise<string[]>((resolve, reject) => {
            resolve(['repoa']);
        });
    }
}

export { ClientServiceGitHub }