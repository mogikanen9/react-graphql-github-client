import { Repository } from "../../../service/model/Repository";

interface IViewListProps {
    orgName: string;
    repos: Repository[];
    paginationCursor: string;
    hasNextPage: boolean;
}

export { IViewListProps };