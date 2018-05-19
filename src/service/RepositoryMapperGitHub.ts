import { IRepositoryMapper } from "./IRepositoryMapper";
import { PaginationInfo } from "./model/PaginationInfo";
import { Repository } from "./model/Repository";

class RepositoryMapperGitHub implements IRepositoryMapper {

    public arrayfromJson(value: any): Repository[] {
        const rs: Repository[] = new Array<Repository>();
        const org: any = value.data;
        const repositories: any = org.organization.repositories;
        const edges: any[] = repositories.edges;
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < edges.length; i++) {
            const repo: Repository = new Repository(edges[i].node.name, edges[i].node.description);
            rs.push(repo);
        }
        return rs;
    }

    public paginationInfoFromJson(value: any): PaginationInfo {
        const pageInfo: any = value.data.organization.repositories.pageInfo;
        if(pageInfo.hasNextPage){
            return new PaginationInfo(pageInfo.endCursor, pageInfo.endCursor);
        }else{
            return new PaginationInfo('', '');
        }
        
    }
}

export { RepositoryMapperGitHub };