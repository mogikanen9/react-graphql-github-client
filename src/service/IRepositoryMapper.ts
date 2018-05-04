import { Repository } from "./model/Repository";

interface IRepositoryMapper {
    onefromJson(value: string):Repository;
    arrayfromJson(value: string): Repository[];
}
export { IRepositoryMapper };