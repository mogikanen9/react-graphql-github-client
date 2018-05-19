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
                <DefaultButton text="<< Prev" onClick={this.props.onPrev} disabled={!this.props.showPrev} />
                <DefaultButton text="Next >>" onClick={this.props.onNext} disabled={!this.props.showNext} />
            </>
        );
    }
}

export { PaginationBar };