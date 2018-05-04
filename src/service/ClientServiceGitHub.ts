import { IClientService } from "./IClientService";
import { Repository } from "./model/Repository";
import { LIST_ORG_REPOS } from "./Queries";

 const GITHUB_API_V4 = 'https://api.github.com/graphql';

// const REPO_QUERY_BODY = ' { "query": "query { viewer { login }}"} ';

class ClientServiceGitHub implements IClientService {

    private ghAccessToken: string;

    constructor(token: string) {
        if (!token == null || token.length < 1) {
            throw new Error('GitHub access token cannot be null or empty!');
        } else {
            this.ghAccessToken = token;
        }

    }

    public listRepos(): Promise<Repository[]> {
        return new Promise<Repository[]>((resolve, reject) => {
            const result = new Array<Repository>();
            result.push(new Repository('repoAA', 'Desc AA'));
            result.push(new Repository('repoBB', 'Desc BB'));

            fetch(GITHUB_API_V4,
                {
                    
                     body: JSON.stringify({query: LIST_ORG_REPOS}),
                    // body: REPO_QUERY_BODY,
                    headers: {
                        'Authorization': 'bearer ' + this.ghAccessToken,
                        'content-type': 'application/json'
                    },
                    method: 'POST'
                })
                .then((response) => {                   
                    response.json().then((data)=>{
                        // tslint:disable-next-line:no-console
                        console.log(data);
                    });
                }).catch((error) => {
                    // tslint:disable-next-line:no-console
                    console.log(error);
                });

            resolve(result);
        });
    }
}

export { ClientServiceGitHub }