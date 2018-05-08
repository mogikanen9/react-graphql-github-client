import * as React from 'react';
import { RepositoryResultList } from '../service/model/RepositoryResultList';
import { IViewListProps } from '../ui/page/repo/IViewListProps';
import { ViewList } from '../ui/page/repo/ViewList';
import { IRouterProps } from './IRouterProps';
import { IRouterState } from './IRouterState';

class Router extends React.Component<IRouterProps, IRouterState>{

    constructor(props: IRouterProps) {
        super(props);
        this.state = {
            ghAccessToken: '',
            hasNextPage: false,
            isError: false,
            isLoading: false,
            paginationCursor: '',
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
                        hasNextPage: result.hasNextPage,
                        isError: false,
                        isLoading: false,
                        paginationCursor: result.pageCursor,
                        repositories: result.repos,
                    });
            }).catch((err) => {
                this.setState(
                    {
                        errorMessage: err,
                        hasNextPage: false,
                        isError: true,
                        isLoading: false,
                        paginationCursor: ''
                    }
                );
            });
    }

    public render() {

        const props: IViewListProps = {
            hasNextPage: this.state.hasNextPage,
            orgName: 'spring-projects',
            paginationCursor: this.state.paginationCursor,
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