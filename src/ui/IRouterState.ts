import { PaginationInfo } from "../service/model/PaginationInfo";
import { Repository } from "../service/model/Repository";

interface IRouterState {
    isLoading: boolean;
    repositories: Repository[];
    isError: boolean;
    errorMessage?: string;
    repoPagination: PaginationInfo;
    repoPaginationKeyMap: Map<string,string>;
}

export { IRouterState };