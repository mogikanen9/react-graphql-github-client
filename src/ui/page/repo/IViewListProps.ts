import { PaginationInfo } from "../../../service/model/PaginationInfo";
import { Repository } from "../../../service/model/Repository";

interface IViewListProps {
    orgName: string;
    repos: Repository[];
    repoPagination:PaginationInfo;
    onNext():void;
}

export { IViewListProps };