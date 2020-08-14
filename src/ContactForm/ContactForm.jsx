/**
 *  @fileOverview Contains ContactForm component and nessary functions
 *  @author       Jan Škvařil      <jan.skvaril@gabros.cz>
 */

import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons/';
import SnackMessages from '../SnackMessages/SnackMessages.jsx';
import './ContactForm.scss';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import PropTypes from 'prop-types';

/**
 * @brief Simple contact form. Contains mail adress and text. Requires send-mail.php to be placed
 * in root folder of the web and corectly configured.
 * On submit sends email to specified email adress
 * @version 2.2.0
 * @example
 *  <ContactForm shadow bg="white" color="black">
        <h2>Here you can write headline</h2>
        <p>Here you cant write some text</p>
    </ContactForm>
 */
class ContactForm extends Component {

    constructor() {
        super();
        this.state = {
            mailAdress: "",
            mailText: "",
            nottOpen: false,
            nottText: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    //handles changes in inputs
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    //submits mail
    submit() {
        if (this.state.mailAdress === "" || this.state.mailText === "") {
            this.empty();
            return;
        }

        let h = new Headers();
        h.append('Accept', 'application/json');
        let fd = new FormData();
        fd.append('mailAdress', this.state.mailAdress);
        fd.append('mailText', this.state.mailText);
        let req = new Request("send-mail.php", {
            method: 'POST',
            headers: h,
            body: fd,
            // mode: 'no-cors'
        });

        fetch(req)
            .then((response) => {
                response.json()
                    .then(() => {
                        this.succes();
                    })
                    .catch(() => {
                        this.error();
                    });

            })
            .catch((err) => {
                this.error();
            });
    }
    //succes mesasge if form was submited
    succes() {
        this.setState({
            mailAdress: "",
            mailText: "",
        }, () => {
            this.showMessage("Zpráva byla úspěšně odeslána, děkujeme!", "succes");
        });
    }
    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ nottOpen: false });
    }
    //displays error message
    error() {
        this.showMessage("Nastala chyba, zpráva nebyla odeslána", "error");
    }
    //displays empty message
    empty() {
        this.showMessage("Obě pole musí být vyplněny", "error");
    }

    render() {
        let props = this.props;
        let styles = {
            boxShadow: props.shadow ? "0px 0px 77px -16px rgba(0,0,0,0.45)" : "none",
            background: props.bg,
            color: !!props.color ? props.color : "black",
        };
        let formColor = !!props.formColor ? props.formColor : "#000000";
        let buttonColor = !!props.buttonColor ? props.buttonColor : "#e0e0e0";

        return (
            <React.Fragment>
                <ThemeProvider theme={createMuiTheme({
                    palette: {
                        primary: {
                            main: formColor,

                        },
                        secondary: {
                            main: buttonColor,
                        }
                    },
                })}>

                    <div className="contact-form" style={styles}>
                        {props.children}
                        <form action="send-mail.php" method="post" id="mailForm">
                            <TextField
                                label="Váš E-mail"
                                margin="normal"
                                color="primary"
                                name="mailAdress"
                                value={this.state.mailAdress}
                                onChange={this.handleInputChange}
                                fullWidth
                            />
                            <br />
                            <TextField
                                id="outlined-multiline-flexible"
                                label="Vaše zpráva"
                                color="primary"
                                multiline
                                rows={10}
                                //rowsMax={12}
                                margin="normal"
                                name="mailText"
                                value={this.state.mailText}
                                onChange={this.handleInputChange}
                                fullWidth
                            />
                            <br />
                            <Button variant="contained" color="secondary" type="button" onClick={this.submit.bind(this)} >
                                Odeslat <Send fontSize="small" style={{ paddingLeft: "10px" }} />
                            </Button>
                        </form>
                    </div>
                    <SnackMessages onRef={ref => (this.showMessage = ref)} />
                </ThemeProvider>
            </React.Fragment >
        );
    }
}
ContactInfo.propTypes = {
    // == styles ==
    /** If shadow should be displayed around section */
    shadow: PropTypes.bool,
    /** Background attribute of the section, can be color, image, gradient,... */
    bg: PropTypes.string,
    /** Text color */
    color: PropTypes.string,
    // == form specific == 
    /** Color of input elements - email adress and textbox */
    formColor: PropTypes.string,
    /** Color of submit button */
    buttonColor: PropTypes.string,

}

export default ContactForm;