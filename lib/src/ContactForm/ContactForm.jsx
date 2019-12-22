import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Send } from '@material-ui/icons/';
import SnackMessages, { showMessage } from '../SnackMessages/SnackMessages.jsx';
import './ContactForm.scss';
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
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
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
    succes() {
        this.setState({
            mailAdress: "",
            mailText: "",
        }, () => {
            showMessage("Zpráva byla úspěšně odeslána, děkujeme!", "succes");
        });
    }
    handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ nottOpen: false });
    }
    error() {
        showMessage("Nastala chyba, zpráva nebyla odeslána", "error");
    }
    empty() {
        showMessage("Obě pole musí být vyplněny", "error");
    }

    render() {
        let props = this.props;
        let styles = {
            boxShadow: props.shadow ? "0px 0px 77px -16px rgba(0,0,0,0.75)" : "none",
            background: props.bg,
            color: !!props.color ? props.color : "white",
        };

        return (
            <React.Fragment>


                <div className="contact-form" style={styles}>
                    {props.children}
                    <form action="send-mail.php" method="post" id="mailForm">
                        <TextField
                            label="Váš E-mail"
                            margin="normal"
                            color="secondary"
                            name="mailAdress"
                            value={this.state.mailAdress}
                            onChange={this.handleInputChange}
                            fullWidth
                        />
                        <br />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Vaše zpráva"
                            color="secondary"
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
                        <Button variant="contained" type="button" onClick={this.submit.bind(this)} >
                            Odeslat <Send fontSize="small" style={{ paddingLeft: "10px" }} />
                        </Button>
                    </form>
                </div>
                <SnackMessages />
            </React.Fragment>
        );
    }
}

export default ContactForm;