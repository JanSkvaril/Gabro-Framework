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

    let text_styles = {
        textShadow: !!props.textShadow ? "0px 0px 4px rgba(50, 50, 50, 1)" : "none"
    }

    let headline_variant = "header";
    if (!!props.orientation) {
        if (props.orientation == "left")
            headline_variant = "header_left"
    }
    let block = "";
    if (!!props.block) {
        block = <div className="block" style={{ background: props.block }}></div >
    }

    return (
        <div className="landing-page" style={styles} id="landing-page">

            {block}
            <span className={headline_variant}>
                <h1 className="main-title" style={text_styles} >{props.title}</h1>
                <h2 className="secondary-title" style={text_styles}>  {props.secondaryTitle}</h2>
            </span>

            <IconButton className="icon-title" href={props.link}>
                <KeyboardArrowDown fontSize="large" />
            </IconButton>

        </div>
    );
}

export default LandingPage;