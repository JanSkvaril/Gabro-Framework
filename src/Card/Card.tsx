/**
 *  @fileOverview Card compponent
 *
 *  @author       Jan Škvařil    <jan.skvaril@gabros.cz>
 */

import React from 'react';
import { bg, color, filePath, numberOfPixels } from '../Types';
import { ReactSVG } from 'react-svg'
import './Card.scss';

/**
 * @brief Simple Card element, great for listing information with images/icons.
 * Can be used anywhere, but should be used in Section, Row part. 
 * 
 * **Example**
 * ```jsx
 * import {ReactComponent as YourIcon} from './path/your_icon.svg'
 * 
 *  <Card
 *   shadow
 *   iconBg="rgb(255, 18, 170)"
 *   iconColor="white"
 *   conBg="white"
 *   conColor="black"
 *   headline="služby"
 *   height="310px"
 *   icon={require("./your_icon.svg")}>
 *       Content
 * 
 *  </Card>
 * ```
 */
function Card(props: Props): JSX.Element {
    let styles = {
        boxShadow: !!props.shadow ? "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)" : "none",
        height: !!props.height ? props.height : "310px",
        backdropFilter: !!props.bgFilter ? props.bgFilter : "",
    };

    // Styles for icon
    let iconStyles = {
        background: (!!props.iconBg ? props.iconBg : "transparent") + " center",
        backgroundSize: "cover",
        color: !!props.iconColor ? props.iconColor : "#000000",
        //border between icon and content
        borderBottom: !!props.divBorder ? props.divBorder : "2px solid"
    }

    let onlyIconStyles = {
        fill: !!props.iconColor ? props.iconColor : "#000000",
    }

    let contentStyles = {
        background: !!props.conBg ? props.conBg : "#ffffff",
        color: !!props.conColor ? props.conColor : "#000000",
    }
    return (
        <div className={`card ${!!props.className ? props.className : ""}`} style={styles} id={!!props.id ? props.id : ""}>
            <div className="icon-holder" style={iconStyles}>
                <div>
                    <span className="icon" style={onlyIconStyles}>
                        <ReactSVG src={props.icon || ""} />
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
    /**
    * **Can be in:** Full, Half, Row
    */
    /** If shadow around the card should be displayed */
    shadow?: string,
    /** Height of the card */
    height?: numberOfPixels,
    /** Backdrop-filter attribute for the card (e.g blur(5px)) */
    bgFilter?: string,
    /** Background (color, image, gradient) for upper part of the card */
    iconBg?: bg,
    /** Color of the icon */
    iconColor?: color,
    /** Dividing line between first and second half part of the card (e.g "none", "2px solid black,...") */
    divBorder?: string,
    /** Background (color, image, gradient) of content (bottom) part of the card */
    conBg?: bg,
    /** Color of the text in content (bottom) part of the card */
    conColor?: color,
    /** Path to your icon (in svg or any image format) */
    icon?: filePath,
    /** Headline displayed in icon part, will have same color as icon (iconColor prop) */
    headline?: string,

    children?: any,
    id?: string,
    className?: string,
};

export default Card;