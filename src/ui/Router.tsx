import * as React from 'react';
import { PaginationInfo } from '../service/model/PaginationInfo';
import { RepositoryResultList } from '../service/model/RepositoryResultList';
import { IViewListProps } from '../ui/page/repo/IViewListProps';
import { ViewList } from '../ui/page/repo/ViewList';
import { IRouterProps } from './IRouterProps';
import { IRouterState } from './IRouterState';

const EMPTY_PAGINATION: PaginationInfo = new PaginationInfo(false, '');

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
    }

    public componentDidMount() {

        this.setState({ isLoading: true });
        this.props.clientService.listRepos()
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
                    <ViewList {...props} />
                </>
            );
        };
    }
}

export { Router };