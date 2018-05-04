import { IClientService } from "./IClientService";
import { IRepositoryMapper } from "./IRepositoryMapper";
import { Repository } from "./model/Repository";
import { LIST_ORG_REPOS } from "./Queries";
import { RepositoryMapperGitHub } from "./RepositoryMapperGitHub";

const GITHUB_API_V4 = 'https://api.github.com/graphql';

class ClientServiceGitHub implements IClientService {

    private ghAccessToken: string;

    private mapper: IRepositoryMapper;

    constructor(token: string) {
        if (!token == null || token.length < 1) {
            throw new Error('GitHub access token cannot be null or empty!');
        } else {
            this.ghAccessToken = token;
        }

        this.mapper = new RepositoryMapperGitHub();
    }

    public listRepos(): Promise<Repository[]> {
        return new Promise<Repository[]>((resolve, reject) => {

            fetch(GITHUB_API_V4,
                {
                    body: JSON.stringify({ query: LIST_ORG_REPOS }),
                    headers: {
                        'Authorization': 'bearer ' + this.ghAccessToken,
                        'content-type': 'application/json'
                    },
                    method: 'POST'
                })
                .then((response) => {
                    response.json().then((data) => {
                        const repos: Repository[] = this.mapper.arrayfromJson(data);
                        resolve(repos);
                    }).catch((error) => {
                        throw new Error(error);
                    });
                }).catch((error) => {
                    throw new Error(error);
                });
        });
    }
}

export { ClientServiceGitHub }