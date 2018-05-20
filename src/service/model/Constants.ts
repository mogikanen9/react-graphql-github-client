import { RepoPagination } from "../../ui/page/repo/RepoPagination";
import { PaginationInfo } from "./PaginationInfo";

export const EMPTY_PAGE_CURSOR: string = '';
export const EMPTY_MAP: Map<string,string> = new Map<string,string>();
export const EMPTY_PAGINATION_INFO: PaginationInfo = new PaginationInfo(false, EMPTY_PAGE_CURSOR);
export const EMPTY_REPO_PAGINATION: RepoPagination = new RepoPagination(EMPTY_PAGINATION_INFO,EMPTY_MAP);