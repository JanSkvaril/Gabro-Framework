import React from 'react'
import { IconButton } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons/';
import './LandingPage.scss'
const LandingPage = (props) => {
    let styles = {
        boxShadow: props.shadow ? "0px 0px 77px -16px rgba(0,0,0,0.75)" : "none",
        background: props.bg,
    };
    return (
        <div className="landing-page" style={styles}>
            <span className="header">
                <h1 className="main-tittle" >{props.mainTittle}</h1>
                <h2 className="secondary-tittle"> {props.secondaryTittle}</h2>
            </span>

            <IconButton className="icon-tittle">
                <KeyboardArrowDown fontSize="large" />
            </IconButton>
        </div>
    );
}

export default LandingPage;