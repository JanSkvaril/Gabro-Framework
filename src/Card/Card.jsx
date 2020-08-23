/**
 *  @fileOverview Card compponent
 *
 *  @author       Jan Škvařil    <jan.skvaril@gabros.cz>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Card.scss';

/**
 * @brief Simple Card element, great for listing information with images/icons
 * Can be used anywhere, but should be used in Section, Row part. 
 * @example
 *  <Card
    shadow
    iconBg="rgb(255, 18, 170)"
    iconColor="white"
    conBg="white"
    conColor="black"
    headline="služby"
    height="310px"
    icon={<AndroidIcon />}>
        Kontent
</Card>
 */
const Card = (props) => {
    let styles = {
        boxShadow: !!props.shadow ? "0px 3.78437px 37.8437px rgba(0, 0, 0, 0.25)" : "none",
        height: !!props.height ? props.height : "310px",
        backdropFilter: !!props.bgFilter ? props.bgFilter : "",
    };
    //sstyles for icon
    let iconStyles = {
        background: !!props.iconBg ? props.iconBg : "#ffffff",
        color: !!props.iconColor ? props.iconColor : "#000000",
        //border between icon and content
        borderBottom: !!props.divBorder ? props.divBorder : "2px solid"
    }
    let contentStyles = {
        background: !!props.conBg ? props.conBg : "#ffffff",
        color: !!props.conColor ? props.conColor : "#000000",
    }
    return (
        <div className={`card ${ !! props.className ? props.className : "" }`} style={ styles } {... !! props.id ? "id={ props.id }" : ""}>
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
//proptypes for cords
Card.propTypes = {
    /** If shadow around the card should be displayed */
    shadow: PropTypes.bool,
    /** Height of the card */
    height: PropTypes.string,
    /** Backdrop-filter attribute for the card (e.g blur(5px)) */
    bgFilter: PropTypes.string,
    /** Background (color, image, gradient) for upper part of the card */
    iconBg: PropTypes.string,
    /** Color of the icon */
    iconColor: PropTypes.string,
    /** Dividing line between first and second half part of the card (e.g "none", "2px solid black,...") */
    divBorder: PropTypes.string,
    /** Background (color, image, gradient) of content (bottom) part of the card */
    conBg: PropTypes.string,
    /** Color of the text in content (bottom) part of the card */
    conColor: PropTypes.string
}

export default Card;