import React from 'react';
import './Card.scss';

const Card = (props) => {

    let styles = {
        boxShadow: !!props.shadow ? "0px 3.78437px 37.8437px rgba(0, 0, 0, 0.25)" : "none",
        width: !!props.width ? props.width : "310px",
    };
    let iconStyles = {
        background: !!props.iconBg ? props.iconBg : "#ffffff",
        color: !!props.iconColor ? props.iconColor : "#000000",
    }
    let contentStyles = {
        background: !!props.conBg ? props.conBg : "#ffffff",
        color: !!props.conColor ? props.conColor : "#000000",
    }
    return (
        <div className="card" style={styles}>
            <div className="icon-holder" style={iconStyles}>
                <div>
                    {props.icon}
                </div>
                <h2>
                    {props.headline}
                </h2>

            </div>
            <div className="content" style={contentStyles}>
                {props.children}
            </div>
        </div>
    );
}


export default Card;