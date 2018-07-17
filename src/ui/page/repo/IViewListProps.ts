import { Repository } from "../../../service/model/Repository";
import { RepoPagination } from "./RepoPagination";

interface IViewListProps {
    orgName: string;
    repos: Repository[];
    repoPagination: RepoPagination;
    onNext(): void;
    onPrev(): void;
    onOrgNameChange(newOrgName: string): void;
}

export { IViewListProps };