/**
 *  @fileOverview Footer compponent
 *
 *  @author       Jan Škvařil    <jan.skvaril@gabros.cz>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Footer.scss';

const Footer = (props) => {
    let styles = {
        background: (!!props.bg ? props.bg : "#ffffff") + " center",
        backgroundSize: "cover",
        color: !!props.color ? props.color : "#000000",
    }
    return (
        <div className="footer" style={styles}>
            <div className="container">
                <div className="img_holder">
                    <img src={props.logo} />
                </div>
                <div className="text_holder">
                    {props.text}
                </div>


            </div>
        </div>
    );
}


export default Footer;