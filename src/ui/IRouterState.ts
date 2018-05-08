import { Repository } from "../service/model/Repository";

interface IRouterState {
    isLoading: boolean;
    repositories: Repository[];
    ghAccessToken:string;
    isError: boolean;
    errorMessage?:string;
    hasNextPage: boolean;
    paginationCursor: string;
}

export { IRouterState };