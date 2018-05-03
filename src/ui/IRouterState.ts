import { Repository } from "../service/model/Repository";

interface IRouterState {
    isLoading: boolean;
    repositories: Repository[];
}

export { IRouterState };