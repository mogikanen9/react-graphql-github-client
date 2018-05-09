import { PaginationInfo } from "./model/PaginationInfo";
import { Repository } from "./model/Repository";

interface IRepositoryMapper {
    arrayfromJson(value: string): Repository[];
    paginationInfoFromJson(value: any): PaginationInfo;
}
export { IRepositoryMapper };