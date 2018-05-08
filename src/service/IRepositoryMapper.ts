import { Repository } from "./model/Repository";

interface IRepositoryMapper {
    arrayfromJson(value: string): Repository[];
    paginationInfoFromJson(value: any): [boolean, string]; // [hasNextPage, cursorId]
}
export { IRepositoryMapper };