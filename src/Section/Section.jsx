import React from 'react';
import './Section.scss';
const Section = (props) => {
    //styles passed by props
    let styles = {
        boxShadow: !!props.shadow ? "0px 0px 77px -16px rgba(0,0,0,0.75)" : "none",
        background: !!props.bg ? props.bg : "#ffffff",
        zIndex: !!props.shadow ? 5 : "auto",
        color: !!props.color ? props.color : "#000000",
        backgroundSize: !!props.bgSize ? props.bgSize : "cover",
        backdropFilter: !!props.bgFilter ? props.bgFilter : "",
        paddingBottom: !!props.paddingBot ? props.paddingBot : "",
        paddingTop: !!props.paddingTop ? props.paddingTop : "",
    };

    //classes
    let classes = "section";
    if (!!props.styled) classes += " styled";
    //align of h tags, default is middle
    if (!!props.headline_align) {
        if (props.headline_align == "right") {
            classes += " h_right";
        }
        else if (props.headline_align == "left") {
            classes += " h_left";
        }
    }

    //left line, is not displayed by default
    let line_styles = {
        display: "none",
    }
    if (!!props.line) {
        line_styles = {
            background: props.line,
        }
    }
    return (
        <div className={classes} style={styles}>
            {/* Content ofsection */}
            {props.children}
            {/* Left line */}
            <div className="line" style={line_styles}></div>
        </div>
    );
}

//In section must be one of "parts" - Full/Half/row

//Will be 100% width
const Full = (props) => {
    let styles = {
        background: (!!props.bg ? props.bg : "transparent") + " center",
        backgroundSize: "cover",
        color: !!props.color ? props.color : "#inherit",
    }

    return (
        <div className="full" style={styles}>
            {props.children}
        </div>);
}

//will cover 50% of width
const Half = (props) => {
    let styles = {
        background: (!!props.bg ? props.bg : "transparent") + " center",
        backgroundSize: "cover",
        color: !!props.color ? props.color : "#inherit",
        backdropFilter: !!props.bgFilter ? props.bgFilter : "",
    }
    let line_styles = {
        display: "none",
    }
    if (!!props.line) {
        line_styles = {
            background: props.line,
        }
    }

    return (
        <div className="half" style={styles}>
            {props.children}
            <div className="line" style={line_styles}></div>
        </div>);
}

//will cover 100% of with, styled for elements displayed next to each other
//e.g. for Card component
const Row = (props) => {
    let styles = {
        background: (!!props.bg ? props.bg : "transparent") + " center",
        backgroundSize: "cover",
        color: !!props.color ? props.color : "inherit",
    }

    return (
        <div className="full row" style={styles}>
            {props.children}
        </div>);
}

export { Row, Full, Half };
export default Section;