import { Repository } from "../service/model/Repository";
import { RepoPagination } from "./page/repo/RepoPagination";

interface IRouterState {
    isLoading: boolean;
    repositories: Repository[];
    isError: boolean;
    errorMessage?: string;
    repoPagination: RepoPagination;
    selectedOrgName: string;
}

export { IRouterState };