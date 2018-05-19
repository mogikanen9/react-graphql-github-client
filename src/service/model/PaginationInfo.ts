class PaginationInfo {
    constructor(readonly nextPageCursor?: string,
        readonly prevPageCursor?: string) { }

    public hasNextPage(): boolean {
        return this.nextPageCursor ? this.nextPageCursor !== '' : false;
    }

    public hasPrevPage(): boolean {
        return this.prevPageCursor ? this.prevPageCursor !== '' : false;
    }
}

export { PaginationInfo };