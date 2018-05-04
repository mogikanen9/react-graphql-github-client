import * as React from 'react';
import { Repository } from '../service/model/Repository';
import { IViewListProps } from '../ui/page/repo/IViewListProps';
import { ViewList } from '../ui/page/repo/ViewList';
import { IRouterProps } from './IRouterProps';
import { IRouterState } from './IRouterState';

class Router extends React.Component<IRouterProps, IRouterState>{

    constructor(props: IRouterProps) {
        super(props);
        this.state = {
            ghAccessToken: '',
            isError: false,
            isLoading: false,
            repositories: []
        }
    }

    public componentDidMount() {

        this.setState({ isLoading: true });
        this.props.clientService.listRepos()
            .then((repos: Repository[]) => {
                this.setState(
                    {
                        errorMessage: '',
                        isError: false,
                        isLoading: false,
                        repositories: repos
                    });
            }).catch((err) => {
                this.setState(
                    {
                        errorMessage: err,
                        isError: true,
                        isLoading: false
                    }
                );
            });
    }

    public render() {

        const props: IViewListProps = {
            orgName: 'spring-projects',
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