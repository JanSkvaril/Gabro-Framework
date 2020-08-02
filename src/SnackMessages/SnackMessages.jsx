import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Snackbar, IconButton, SnackbarContent } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { green, red } from '@material-ui/core/colors';

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
    constructor(props) {
        super(props);
        this.state = {
            open: false, //if snackmessage is displayed
            text: "", //content of the message
            type: "normal" //type of message, can be "succes", "error", "normal"
        };
    }

    //closing message
    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ open: false });
    };

    //function, that opens the message called by parrent
    Open(message, type) {
        console.log(this);
        this.setState({ open: true, text: message, type: type });
    }

    //so user can create reference in parrent object like this:¨
    //<SnackMessages onRef={ref => (this.showMessage = ref)} />
    //and then just call this.showMessage() to call Open()
    componentDidMount() {
        this.props.onRef(this.Open.bind(this))
    }
    componentWillUnmount() {
        this.props.onRef(undefined)
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Snackbar
                    // position
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={this.handleClose.bind(this)}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}

                    //content of the message
                    children={
                        <SnackbarContent
                            message={this.state.text}
                            className={classes[this.state.type]}
                            action={[
                                <IconButton
                                    key="close"
                                    aria-label="Close"
                                    color="inherit"
                                    onClick={this.handleClose.bind(this)}
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

export default withStyles(styles)(SnackMes);