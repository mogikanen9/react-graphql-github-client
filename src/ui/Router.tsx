import * as React from 'react';
import { IViewListProps } from '../ui/page/repo/IViewListProps';
import { ViewList } from '../ui/page/repo/ViewList';
import { IRouterProps } from './IRouterProps';
import { IRouterState } from './IRouterState';

class Router extends React.Component<IRouterProps, IRouterState>{

    constructor(props: IRouterProps) {
        super(props);
        this.state = {
            isLoading: false,
            repositories: []
        }
    }

    public componentDidMount() {
        this.setState({ isLoading: true });
        this.props.clientService.listRepos().then((repos: string[]) => {
            this.setState({ isLoading: false, repositories: repos });
        }).catch((err) => { this.setState({ isLoading: false }); });
    }

    public render() {

        const props: IViewListProps = { orgName: 'spring-projects' };

        if (this.state.isLoading) {
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