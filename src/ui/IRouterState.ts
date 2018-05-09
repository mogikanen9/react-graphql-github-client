import { PaginationInfo } from "../service/model/PaginationInfo";
import { Repository } from "../service/model/Repository";

interface IRouterState {
    isLoading: boolean;
    repositories: Repository[];
    ghAccessToken:string;
    isError: boolean;
    errorMessage?:string;
    repoPagination?:PaginationInfo;
}

export { IRouterState };