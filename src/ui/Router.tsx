import * as React from 'react';

import { IViewListProps } from '../ui/page/repo/IViewListProps';
import { ViewList } from '../ui/page/repo/ViewList';

class Router extends React.Component<{}, {}>{

    constructor(props:any) {
        super(props);
    }

    public render() {

        const props: IViewListProps = { orgName: 'spring-projects' };

        return (
            <>
                <ViewList {...props} />
            </>
        );
    }
}

export { Router };