import * as React from 'react';
import { IViewListProps } from './IViewListProps';

import {
    DetailsList,
    IColumn,
    SelectionMode
} from 'office-ui-fabric-react/lib/DetailsList';
import { IPaginationBarProps } from '../../component/pagination/IPaginationBarProps';
import { PaginationBar } from '../../component/pagination/PaginationBar';
import { OrgName } from '../organization/OrgName';

const VIEW_COLUMNS: IColumn[] = [
    {
        ariaLabel: 'Repository name',
        fieldName: 'name',
        isResizable: true,
        key: 'name',
        maxWidth: 100,
        minWidth: 50,
        name: 'Repository'
    },
    {
        ariaLabel: 'Description',
        fieldName: 'description',
        isResizable: true,
        key: 'description',
        maxWidth: 200,
        minWidth: 100,
        name: 'Description'
    },
];

class ViewList extends React.Component<IViewListProps, {}> {

    constructor(props: IViewListProps) {
        super(props);
        this.showNextPage = this.showNextPage.bind(this);
        this.showPrevPage = this.showPrevPage.bind(this);
    }

    public render() {

        const pagProps: IPaginationBarProps =
            {
                onNext: this.showNextPage,
                onPrev: this.showPrevPage,
                showNext: this.props.repoPagination.hasNextPage(),
                showPrev: this.props.repoPagination.hasPrevPage()
            };

        return (
            <>
                <OrgName orgName= {this.props.orgName} />
                <DetailsList
                    items={this.props.repos}
                    columns={VIEW_COLUMNS}
                    setKey='set'
                    compact={true}
                    selectionMode={SelectionMode.single}

                />
                <PaginationBar {...pagProps} />
            </>
        );
    }

    protected showNextPage(): void {
        this.props.onNext();
    }

    protected showPrevPage(): void {
        this.props.onPrev();
    }
}

export { ViewList };
