import { ActionButton, DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogContent, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from "react";
import { IOrgNameProps } from "./IOrgNameProps";
import { IOrgNameState } from './IOrgNameState';

class OrgName extends React.Component<IOrgNameProps, IOrgNameState> {

    constructor(props: IOrgNameProps) {
        super(props);
        this.onOrgnameValueChange = this.onOrgnameValueChange.bind(this);
        this.showDialog = this.showDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.state = {
            orgNameValue: this.props.orgName,
            showDialog: false
        }
    }

    public render() {
        return (
            <>
                <h2> Organization {this.props.orgName}
                    <ActionButton
                        onClick={this.showDialog}
                        iconProps={{ iconName: 'DrillThrough' }} >-</ActionButton>
                </h2>
                <Dialog
                    dialogContentProps={{
                        // subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.',
                        title: 'Provide organization',
                        type: DialogType.normal
                    }}
                    hidden={!this.state.showDialog}
                    modalProps={{
                        containerClassName: 'ms-dialogMainOverride',
                        isBlocking: true
                    }}
                    onDismiss={this.closeDialog}
                >
                    <DialogContent>
                        <TextField
                            label='Organization Name on GitHub'
                            onChanged={this.onOrgnameValueChange}
                            value={this.props.orgName}
                        />
                    </DialogContent>
                    <DialogFooter>
                        <PrimaryButton onClick={this.closeDialog} text='Save' />
                        <DefaultButton onClick={this.closeDialog} text='Cancel' />
                    </DialogFooter>
                </Dialog>
            </>
        );
    }

    private onOrgnameValueChange(newValue: string): void {
        this.setState({ orgNameValue: newValue });
    }

    private closeDialog(): void {
        this.setState({ showDialog: false });
        // this.props.onSubmit(this.state.tokenValue);
    }

    private showDialog(): void {
        this.setState({ showDialog: true });
    }
}

export { OrgName };