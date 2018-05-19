import * as React from 'react';
import { PaginationInfo } from '../service/model/PaginationInfo';
import { RepositoryResultList } from '../service/model/RepositoryResultList';
import { IViewListProps } from '../ui/page/repo/IViewListProps';
import { ViewList } from '../ui/page/repo/ViewList';
import { IRouterProps } from './IRouterProps';
import { IRouterState } from './IRouterState';

const EMPTY_PAGINATION: PaginationInfo = new PaginationInfo(false, '');
const DEFAULT_PAGE_SIZE = 10;

class Router extends React.Component<IRouterProps, IRouterState>{

    constructor(props: IRouterProps) {
        super(props);
        this.state = {
            ghAccessToken: '',
            isError: false,
            isLoading: false,
            repoPagination: EMPTY_PAGINATION,
            repositories: []
        }

        this.nextRepoPage = this.nextRepoPage.bind(this);
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
                        repoPagination: result.paginationInfo,
                        repositories: result.repos,
                    });
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
            hasNextPage:
                this.state.repoPagination ? this.state.repoPagination.hasNextPage : false,
            onNext: this.nextRepoPage,
            orgName: 'spring-projects',
            paginationCursor:
                this.state.repoPagination ? this.state.repoPagination.pageCursor : '',
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
                            <div className="ms-Grid-col ms-sm12 ms-md2 ms-lg2"/>
                            <div className="ms-Grid-col ms-sm12 ms-md8 ms-lg8">
                                <ViewList {...props} />
                            </div>
                            <div className="ms-Grid-col ms-sm12 ms-md2 ms-lg2"/>
                        </div>
                    </div>

                </>
            );
        };
    }

    protected nextRepoPage(): void {
        this.setState({ isLoading: true });
        this.props.clientService.listRepos(DEFAULT_PAGE_SIZE,
            this.state.repoPagination ? this.state.repoPagination.pageCursor : undefined)
            .then((result: RepositoryResultList) => {
                this.setState(
                    {
                        errorMessage: '',
                        isError: false,
                        isLoading: false,
                        repoPagination: result.paginationInfo,
                        repositories: result.repos,
                    });
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