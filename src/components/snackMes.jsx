import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';

let openFunc;

const styles = theme => ({
    normal: {

    },
    error: {
        backgroundColor: red[900],
        color: "#ffffff"
    },
    succes: {
        backgroundColor: green[800],
        color: "#ffffff"
    }
})

class SnackMes extends React.Component {
    state = {
        open: false,
        text: "",
        type: "normal"
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };
    Open(message, type) {
        this.setState({ open: true, text: message, type: type });
    }
    render() {
        openFunc = this.Open.bind(this);
        const { classes } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}

                    children={
                        <SnackbarContent
                            message={this.state.text}
                            className={classes[this.state.type]}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleClose}
                                >
                                    <Close />

                                </IconButton>,
                            ]} />
                    }


                />

            </div>
        );
    }
}

export function showMessage(message, type) {
    openFunc(message, type);
}
export default withStyles(styles)(SnackMes);