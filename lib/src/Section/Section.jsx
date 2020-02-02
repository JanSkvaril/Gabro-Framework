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
    return (
        <div className={classes} style={styles}>
            {props.children}
        </div>
    );
}

export default Section;