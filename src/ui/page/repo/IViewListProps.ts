import { Repository } from "../../../service/model/Repository";

interface IViewListProps {
    orgName: string;
    repos: Repository[];
}

export { IViewListProps };