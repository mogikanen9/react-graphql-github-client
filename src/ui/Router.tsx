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
            isLoading: false,
            repositories: []
        }
    }

    public componentDidMount() {

        // const result = new Array<Repository>();
        // result.push(new Repository('repoA', 'Desc A'));
        // result.push(new Repository('repoB', 'Desc B'));
        // this.setState({ isLoading: false, repositories: result });

        this.setState({ isLoading: true });
        this.props.clientService.listRepos()
            .then((repos: Repository[]) => {
                this.setState({ isLoading: false, repositories: repos });
            }).catch((err) => { this.setState({ isLoading: false }); });
    }

    public render() {

        const props: IViewListProps = {
            orgName: 'spring-projects',
            repos: this.state.repositories
        };

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