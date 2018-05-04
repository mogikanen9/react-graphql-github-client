import { IRepositoryMapper } from "./IRepositoryMapper";
import { Repository } from "./model/Repository";

class RepositoryMapperGitHub implements IRepositoryMapper {
    public onefromJson(value: string): Repository {
        const node: any = JSON.parse(value);
        return new Repository(node.name, node.description);
    }
    public arrayfromJson(value: any): Repository[] {
        const rs:Repository[] =  new Array<Repository>();
        const org: any = value.data;
        const name:string = org.organization.name;
        // tslint:disable-next-line:no-console
        console.log(`name->${name}`);
        const repositories:any = org.organization.repositories;
        const edges:any[] = repositories.edges;
        // tslint:disable-next-line:prefer-for-of
        for (let i=0; i<edges.length; i++) {           
           const repo:Repository = new Repository(edges[i].node.name, edges[i].node.description);
           rs.push(repo);
          }
        return rs;
    }
}

export { RepositoryMapperGitHub };