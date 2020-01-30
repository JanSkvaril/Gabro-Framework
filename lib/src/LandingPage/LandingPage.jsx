import React from 'react'
import { IconButton } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons/';
import './LandingPage.scss'
const LandingPage = (props) => {
    let styles = {
        boxShadow: props.shadow ? "0px 0px 77px -16px rgba(0,0,0,0.75)" : "none",
        background: props.bg,
        color: !!props.color ? props.color : "white",
        backgroundSize: !!props.bgSize ? props.bgSize : "cover",
        zIndex: !!props.shadow ? 5 : -1,
    };
    return (
        <div className="landing-page" style={styles} id="landing-page">
            <span className="header">
                <h1 className="main-tittle" >{props.mainTittle}</h1>
                <h2 className="secondary-tittle"> {props.secondaryTittle}</h2>
            </span>

            <IconButton className="icon-tittle" href={props.link}>
                <KeyboardArrowDown fontSize="large" />
            </IconButton>
        </div>
    );
}

export default LandingPage;