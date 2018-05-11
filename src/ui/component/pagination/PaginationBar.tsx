import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as React from "react";
import { IPaginationBarProps } from "./IPaginationBarProps";

class PaginationBar extends React.Component<IPaginationBarProps, {}> {

    constructor(props: IPaginationBarProps) {
        super(props);
    }

    public render() {
        return (
            <>
                <DefaultButton text="<< Prev" />
                <DefaultButton text="Next >>" onClick={this.props.onNext} />
            </>
        );
    }
}

export { PaginationBar };