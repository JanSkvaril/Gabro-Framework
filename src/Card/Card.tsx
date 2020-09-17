/**
 *  @fileOverview Card compponent
 *
 *  @author       Jan Škvařil    <jan.skvaril@gabros.cz>
 */

import React from 'react';
import './Card.scss';

/**
 * @brief Simple Card element, great for listing information with images/icons.
 * Can be used anywhere, but should be used in Section, Row part. 
 * 
 * **Example**
 * ```jsx
 *  <Card
 *   shadow
 *   iconBg="rgb(255, 18, 170)"
 *   iconColor="white"
 *   conBg="white"
 *   conColor="black"
 *   headline="služby"
 *   height="310px"
 *   icon={<AndroidIcon />}>
 *       Content
 * ```
 */
function Card(props: Props): JSX.Element {
    let styles = {
        boxShadow: !!props.shadow ? "0px 3.78437px 37.8437px rgba(0, 0, 0, 0.25)" : "none",
        height: !!props.height ? props.height : "310px",
        backdropFilter: !!props.bgFilter ? props.bgFilter : "",
    };
    //sstyles for icon
    let iconStyles = {
        background: (!!props.iconBg ? props.iconBg : "transparent") + " center",
        backgroundSize: "cover",
        color: !!props.iconColor ? props.iconColor : "#000000",
        //border between icon and content
        borderBottom: !!props.divBorder ? props.divBorder : "2px solid"
    }
    let contentStyles = {
        background: !!props.conBg ? props.conBg : "#ffffff",
        color: !!props.conColor ? props.conColor : "#000000",
    }
    return (
        <div className={`card ${!!props.className ? props.className : ""}`} style={styles} id={!!props.id ? props.id : ""}>
            <div className="icon-holder" style={iconStyles}>
                <div>
                    <span className="icon">
                        {props.icon}
                    </span>
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
interface Props {
    /** If shadow around the card should be displayed */
    shadow?: string,
    /** Height of the card */
    height?: string,
    /** Backdrop-filter attribute for the card (e.g blur(5px)) */
    bgFilter?: string,
    /** Background (color, image, gradient) for upper part of the card */
    iconBg?: string,
    /** Color of the icon */
    iconColor?: string,
    /** Dividing line between first and second half part of the card (e.g "none", "2px solid black,...") */
    divBorder?: string,
    /** Background (color, image, gradient) of content (bottom) part of the card */
    conBg?: string,
    /** Color of the text in content (bottom) part of the card */
    conColor?: string,
    /** svg or img component. Will be displayed in upper part of the card */
    icon?: JSX.Element,
    /** Headline displayed in icon part, will have same color as icon (iconColor prop) */
    headline?: string,

    children?: any,
    id?: string,
    className?: string,
};

export default Card;