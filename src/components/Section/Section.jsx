import React from 'react';
import './Section.scss';
const Section = (props) => {
    let styles = {
        boxShadow: props.shadow ? "0px 0px 77px -16px rgba(0,0,0,0.75)" : "none",
        background: props.bg,
        color: props.color,
    };
    return (
        <div className="section" style={styles}>
            {props.children}
        </div>
    );
}

export default Section;