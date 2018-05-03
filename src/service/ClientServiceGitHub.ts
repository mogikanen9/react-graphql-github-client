import { IClientService } from "./IClientService";
import { Repository } from "./model/Repository";

class ClientServiceGitHub implements IClientService {

    public listRepos(): Promise<Repository[]> {
        return new Promise<Repository[]>((resolve, reject) => {
            const result = new Array<Repository>();
            result.push(new Repository('repoAA', 'Desc AA'));
            result.push(new Repository('repoBB', 'Desc BB'));
            resolve(result);
        });
    }
}

export { ClientServiceGitHub }