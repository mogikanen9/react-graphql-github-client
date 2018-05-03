import * as React from 'react';
import { IViewListProps } from './IViewListProps';

import {
    DetailsList,
    IColumn,
    SelectionMode
} from 'office-ui-fabric-react/lib/DetailsList';


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
    }

    public render() {
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
            </>
        );
    }
}

export { ViewList };
