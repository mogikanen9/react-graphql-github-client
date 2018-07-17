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
        this.saveChanges = this.saveChanges.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.state = {
            orgNameValue: this.props.orgName,
            prevOrgNameValue: this.props.orgName,
            showDialog: false
        }
    }

    public render() {
        return (
            <>
                <div>
                    <h2> Organization {this.props.orgName}
                        <ActionButton
                            onClick={this.showDialog}
                            iconProps={{ iconName: 'DrillDownSolid' }} />
                    </h2>
                </div>
                <Dialog
                    dialogContentProps={{
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
                            value={this.state.orgNameValue}
                        />
                    </DialogContent>
                    <DialogFooter>
                        <PrimaryButton onClick={this.saveChanges} text='Save' />
                        <DefaultButton onClick={this.cancelChanges} text='Cancel' />
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

    }

    private cancelChanges(): void {
        this.setState({ orgNameValue: this.state.prevOrgNameValue });
        this.closeDialog();
    }

    private saveChanges(): void {
        this.closeDialog();
        if (this.state.orgNameValue !== this.state.prevOrgNameValue) {
            this.props.orgNameChanged(this.state.orgNameValue);
        }
    }

    private showDialog(): void {
        this.setState({ showDialog: true });
    }
}

export { OrgName };