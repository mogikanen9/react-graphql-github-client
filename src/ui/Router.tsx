import * as React from 'react';
import { PaginationInfo } from '../service/model/PaginationInfo';
import { RepositoryResultList } from '../service/model/RepositoryResultList';
import { IViewListProps } from '../ui/page/repo/IViewListProps';
import { ViewList } from '../ui/page/repo/ViewList';
import { IRouterProps } from './IRouterProps';
import { IRouterState } from './IRouterState';

const EMPTY_PAGINATION: PaginationInfo = new PaginationInfo('', '');
const DEFAULT_PAGE_SIZE = 10;

class Router extends React.Component<IRouterProps, IRouterState>{

    constructor(props: IRouterProps) {
        super(props);
        this.state = {
            isError: false,
            isLoading: false,
            repoPagination: EMPTY_PAGINATION,
            repoPaginationKeyMap: new Map(),
            repositories: []
        }

        this.nextRepoPage = this.nextRepoPage.bind(this);
        this.prevRepoPage = this.prevRepoPage.bind(this);
        this.repoPage = this.repoPage.bind(this);
    }

    public componentDidMount() {

        this.setState({ isLoading: true });
        this.props.clientService.listRepos(DEFAULT_PAGE_SIZE)
            .then((result: RepositoryResultList) => {
                this.setState(
                    {
                        errorMessage: '',
                        isError: false,
                        isLoading: false,
                        repoPagination: new PaginationInfo(result.paginationInfo.nextPageCursor, ''),
                        repositories: result.repos,
                    });
                const nextRepoCursorValue = result.paginationInfo.nextPageCursor ? result.paginationInfo.nextPageCursor : '';
                this.state.repoPaginationKeyMap.set(nextRepoCursorValue, '');
            }).catch((err) => {
                this.setState(
                    {
                        errorMessage: err,
                        isError: true,
                        isLoading: false,
                        repoPagination: EMPTY_PAGINATION
                    }
                );
            });
    }


    public render() {

        const props: IViewListProps = {
            onNext: this.nextRepoPage,
            onPrev: this.prevRepoPage,
            orgName: 'spring-projects',
            repoPagination: this.state.repoPagination,
            repos: this.state.repositories
        };

        if (this.state.isError) {
            return (<p>Ups! Error '{this.state.errorMessage}'</p>);
        } else if (this.state.isLoading) {
            return (<p>Loading ...</p>);
        } else {
            return (
                <>
                    <div className="ms-Grid">
                        <div className="ms-Grid-row">
                            <div className="ms-Grid-col ms-sm12 ms-md2 ms-lg2" />
                            <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
                                <ViewList {...props} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md2 ms-lg2" />
                        </div>
                    </div>

                </>
            );
        };
    }

    protected nextRepoPage(): void {
        this.repoPage(DEFAULT_PAGE_SIZE, this.state.repoPagination ? this.state.repoPagination.nextPageCursor : undefined);
    }

    protected prevRepoPage(): void {
        const nextPageCursor = this.state.repoPagination.nextPageCursor ?
            this.state.repoPagination.nextPageCursor : '';
        const prevPageCursor =
            this.state.repoPaginationKeyMap.get(nextPageCursor);
        this.repoPage(DEFAULT_PAGE_SIZE, prevPageCursor);
    }

    protected repoPage(pageSize: number, paginationCursor?: string): void {
        this.setState({ isLoading: true });
        this.props.clientService.listRepos(pageSize, paginationCursor)
            .then((result: RepositoryResultList) => {
                const existingNextRepoCursorValue =
                    this.state.repoPagination.nextPageCursor ?
                        this.state.repoPagination.nextPageCursor : '';
                this.setState(
                    {
                        errorMessage: '',
                        isError: false,
                        isLoading: false,
                        // return nextCursor becomes next, existing next xursor becomes prev
                        repoPagination: new PaginationInfo(result.paginationInfo.nextPageCursor,
                            this.state.repoPagination.nextPageCursor),
                        repositories: result.repos,
                    });

                if (result.paginationInfo.nextPageCursor &&
                    result.paginationInfo.nextPageCursor !== ''
                    && !this.state.repoPaginationKeyMap.has(result.paginationInfo.nextPageCursor)) {
                    this.state.repoPaginationKeyMap.set(result.paginationInfo.nextPageCursor,
                        existingNextRepoCursorValue);
                }

            }).catch((err) => {
                this.setState(
                    {
                        errorMessage: err,
                        isError: true,
                        isLoading: false,
                        repoPagination: EMPTY_PAGINATION
                    }
                );
            });
    }
}

export { Router };