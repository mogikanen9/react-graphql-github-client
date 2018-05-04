import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogContent, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from "react";
import { ISettingsProps } from './ISettingsProps';
import ISettingsState from "./ISettingsState";


class Settings extends React.Component<ISettingsProps, ISettingsState> {

    constructor(props: ISettingsProps) {
        super(props);
        this.state = { showDialog: true, tokenValue: '' };
        this.closeDialog = this.closeDialog.bind(this);
        this.onTokenValueChange = this.onTokenValueChange.bind(this);
    }

    public render() {
        return (
            <>
                <Dialog
                    dialogContentProps={{
                        // subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.',
                        title: 'Settings',
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
                            label='GitHub Access Token'
                            onChanged={this.onTokenValueChange}
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

    private onTokenValueChange(newValue: string): void{
        this.setState({ tokenValue: newValue });
    }

    private closeDialog(): void{
        this.setState({ showDialog: false });
        this.props.onSubmit(this.state.tokenValue);
    }
}

export { Settings };