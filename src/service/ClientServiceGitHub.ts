import { IClientService } from "./IClientService";
import { IRepositoryMapper } from "./IRepositoryMapper";
import { PaginationInfo } from "./model/PaginationInfo";
import { Repository } from "./model/Repository";
import { RepositoryResultList } from "./model/RepositoryResultList";
import { buildOrganizationRepoQuery } from "./Queries";
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

    public listRepos(orgName: string, itemsPerPage: number, pageCursor?: string): Promise<RepositoryResultList> {
        return new Promise<RepositoryResultList>((resolve, reject) => {

            const queryString = buildOrganizationRepoQuery(orgName, itemsPerPage, pageCursor);        

            fetch(GITHUB_API_V4,
                {
                    body: JSON.stringify({ query: queryString }),
                    headers: {
                        'Authorization': 'bearer ' + this.ghAccessToken,
                        'content-type': 'application/json'
                    },
                    method: 'POST'
                })
                .then((response) => {
                    response.json().then((data) => {
                        const repos: Repository[] = this.mapper.arrayfromJson(data);
                        const paginationInfo: PaginationInfo = this.mapper.paginationInfoFromJson(data);
                        resolve(new RepositoryResultList(repos, paginationInfo));
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