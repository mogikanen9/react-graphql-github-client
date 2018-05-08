import * as React from 'react';
import { IViewListProps } from './IViewListProps';

import {
    DetailsList,
    IColumn,
    SelectionMode
} from 'office-ui-fabric-react/lib/DetailsList';
import { IPaginationBarProps } from '../../component/pagination/IPaginationBarProps';
import { PaginationBar } from '../../component/pagination/PaginationBar';

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
                showNext: this.props.hasNextPage,
                showPrev: true
            };

        return (
            <>
                <h2> Organization {this.props.orgName} </h2>
                <DetailsList
                    items={this.props.repos}
                    columns={VIEW_COLUMNS}
                    setKey='set'
                    compact={true}
                    selectionMode={SelectionMode.single}
                />
                <PaginationBar {...pagProps} />
                <p>{this.props.paginationCursor}</p>
            </>
        );
    }

    protected showNextPage(): void {
        // TODO
    }

    protected showPrevPage(): void {
        // TODO
    }
}

export { ViewList };
