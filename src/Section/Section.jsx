import React from 'react';
import './Section.scss';
const Section = (props) => {
    let styles = {
        boxShadow: !!props.shadow ? "0px 0px 77px -16px rgba(0,0,0,0.75)" : "none",
        background: !!props.bg ? props.bg : "#ffffff",
        zIndex: !!props.shadow ? 5 : "auto",
        color: !!props.color ? props.color : "#000000",
        backgroundSize: !!props.bgSize ? props.bgSize : "cover",
    };
    let classes = "section";
    if (!!props.styled) classes += " styled";
    if (!!props.headline_align) {
        if (props.headline_align == "right") {
            classes += " h_right";
        }
        else if (props.headline_align == "left") {
            classes += " h_left";
        }
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
        <div className={classes} style={styles}>
            {props.children}
            <div className="line" style={line_styles}></div>
        </div>
    );
}

const Full = (props) => {
    let styles = {
        background: !!props.bg ? props.bg : "transparent",
        color: !!props.color ? props.color : "#inherit",
    }

    return (
        <div className="full" style={styles}>
            {props.children}
        </div>);
}

const Half = (props) => {
    let styles = {
        background: !!props.bg ? props.bg : "transparent",
        color: !!props.color ? props.color : "#inherit",
    }

    return (
        <div className="half" style={styles}>
            {props.children}
        </div>);
}

const Row = (props) => {
    let styles = {
        background: !!props.bg ? props.bg : "transparent",
        color: !!props.color ? props.color : "inherit",
    }

    return (
        <div className="full row" style={styles}>
            {props.children}
        </div>);
}

export { Row, Full, Half };
export default Section;