import { EMPTY_PAGE_CURSOR } from "../../../service/model/Constants";
import { PaginationInfo } from "../../../service/model/PaginationInfo";

class RepoPagination {

    constructor(readonly paginationInfo: PaginationInfo, readonly pageCursors: Map<string, string>) { }

    public hasNextPage(): boolean {
        return this.paginationInfo.hasNextPage;
    }

    public hasPrevPage(): boolean {
        return (this.pageCursors.has(this.paginationInfo.currentPageCursor)
            && this.pageCursors.get(this.paginationInfo.currentPageCursor) !== EMPTY_PAGE_CURSOR);
    }

    public getCurPageCursor(): string {
        return this.paginationInfo.currentPageCursor;
    }

    public getPrevPageCursor(): string {
        const prevCursor = this.pageCursors.get(this.paginationInfo.currentPageCursor);
        if (prevCursor) {
            // we need to query it one more time since we need to find prev of prev
            const finalPrev = this.pageCursors.get(prevCursor);
            if(finalPrev){
                return finalPrev;
            }
        } 
            return EMPTY_PAGE_CURSOR;        
    }   
}

export { RepoPagination };