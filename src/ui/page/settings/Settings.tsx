import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Dialog, DialogContent, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import * as React from "react";
import ISettingsState from "./ISettingsState";


class Settings extends React.Component<{}, ISettingsState> {

    constructor(props: any) {
        super(props);
        this.state = { showDialog: true };
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

    private closeDialog = (): void => {
        this.setState({ showDialog: false });
    }
}

export { Settings };