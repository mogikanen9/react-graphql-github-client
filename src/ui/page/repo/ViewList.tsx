import * as React from 'react';
import { IViewListProps } from './IViewListProps';

class ViewList extends React.Component<IViewListProps,{}> {

    constructor(props: IViewListProps) {
        super(props);
    }

    public render() {
        return (
            <div>
               <h2> Organization {this.props.orgName} </h2>
            </div>
        );
    }
}

export { ViewList };
