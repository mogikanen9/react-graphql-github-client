import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as React from 'react';
import { EMPTY_PAGE_CURSOR, EMPTY_REPO_PAGINATION } from '../service/model/Constants';
import { RepositoryResultList } from '../service/model/RepositoryResultList';
import { IViewListProps } from '../ui/page/repo/IViewListProps';
import { ViewList } from '../ui/page/repo/ViewList';
import { IRouterProps } from './IRouterProps';
import { IRouterState } from './IRouterState';
import { RepoPagination } from './page/repo/RepoPagination';

const DEFAULT_PAGE_SIZE = 10;
const DEFAULT_ORG = "spring-projects";

class Router extends React.Component<IRouterProps, IRouterState>{

    constructor(props: IRouterProps) {
        super(props);

        initializeIcons(/* optional base url */);

        this.state = {
            isError: false,
            isLoading: false,
            repoPagination: EMPTY_REPO_PAGINATION,
            repositories: []
        }

        this.nextRepoPage = this.nextRepoPage.bind(this);
        this.prevRepoPage = this.prevRepoPage.bind(this);
        this.repoPage = this.repoPage.bind(this);
        this.orgNameChanged = this.orgNameChanged.bind(this);
    }

    public componentDidMount() {

        this.setState({ isLoading: true });
        this.props.clientService.listRepos(DEFAULT_ORG, DEFAULT_PAGE_SIZE)
            .then((result: RepositoryResultList) => {

                const pageCursors = this.state.repoPagination.pageCursors;
                if (!pageCursors.has(result.paginationInfo.currentPageCursor)) {
                    pageCursors.set(result.paginationInfo.currentPageCursor, EMPTY_PAGE_CURSOR);
                }
                this.setState(
                    {
                        errorMessage: '',
                        isError: false,
                        isLoading: false,
                        repoPagination: new RepoPagination(result.paginationInfo, pageCursors),
                        repositories: result.repos,
                    });
            }).catch((err) => {
                this.setState(
                    {
                        errorMessage: err,
                        isError: true,
                        isLoading: false,
                        repoPagination: EMPTY_REPO_PAGINATION
                    }
                );
            });
    }


    public render() {

        const props: IViewListProps = {
            onNext: this.nextRepoPage,
            onOrgNameChange: this.orgNameChanged,
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

    protected orgNameChanged(newOrgName: string): void {
        // tslint:disable-next-line:no-console
        console.log(`New orgName->${newOrgName}`);
    }

    protected nextRepoPage(): void {
        this.repoPage(DEFAULT_PAGE_SIZE, this.state.repoPagination.getCurPageCursor(), true);
    }

    protected prevRepoPage(): void {
        this.repoPage(DEFAULT_PAGE_SIZE, this.state.repoPagination.getPrevPageCursor(), false);
    }

    protected repoPage(pageSize: number, paginationCursor: string, forward: boolean): void {
        this.setState({ isLoading: true });
        this.props.clientService.listRepos(DEFAULT_ORG, pageSize, paginationCursor)
            .then((result: RepositoryResultList) => {
                const pageCursors = this.state.repoPagination.pageCursors;
                if (forward && !pageCursors.has(result.paginationInfo.currentPageCursor)) {
                    pageCursors.set(result.paginationInfo.currentPageCursor, this.state.repoPagination.getCurPageCursor());
                }
                this.setState(
                    {
                        errorMessage: '',
                        isError: false,
                        isLoading: false,
                        repoPagination: new RepoPagination(result.paginationInfo, pageCursors),
                        repositories: result.repos,
                    });

            }).catch((err) => {
                this.setState(
                    {
                        errorMessage: err,
                        isError: true,
                        isLoading: false,
                        repoPagination: EMPTY_REPO_PAGINATION
                    }
                );
            });
    }
}

export { Router };