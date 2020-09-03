/**
 *  @fileOverview Contains Section component and nesesary functions
 *  @author       Jan Škvařil    <jan.skvaril@gabros.cz>
 */

import React from 'react';
import './Section.scss';


/**
 * @brief Section component contains part components, its main building block of gabro framework website
 * Section component has 100% width a height dependent on its content. Its generally used for text block
 * or to contain other components (like contact form, cords, etc.).
 */
const Section = (props: Props) => {
    //styles passed by props
    let styles = {
        boxShadow: !!props.shadow ? "0px 0px 77px -16px rgba(0,0,0,0.75)" : "none",
        background: (!!props.bg ? props.bg : "transparent") + " center",
        zIndex: !!props.shadow ? 5 : 0,
        color: !!props.color ? props.color : "#000000",
        backgroundSize: !!props.bgSize ? props.bgSize : "cover",
        backdropFilter: !!props.bgFilter ? props.bgFilter : "",
        paddingBottom: !!props.paddingBot ? props.paddingBot : "",
        paddingTop: !!props.paddingTop ? props.paddingTop : "",
    };

    //classes
    let classes = `section ${!!props.className ? props.className : ""}`
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
        background: ""
    }
    if (!!props.line) {
        line_styles.background = props.line;

    }

    return (
        <div className={classes} style={styles} id={!!props.id ? props.id : ""}>
            {/* Content ofsection */}
            {props.children}
            {/* Left line */}
            <div className="line" style={line_styles}></div>

        </div>
    );
}

//proptypes for section
interface Props {
    // == Styles ==
    /** If shadow should be displayed around section */
    shadow?: boolean,
    /** Background attribute of the section, can be color, image, gradient,... */
    bg?: string,
    /** Text color */
    color?: string,
    /** Background-size attribute, default is "cover" */
    bgSize?: string,
    /** Backdrop-filter attribute, for example blur(5px) will blur the background */
    bgFilter?: string,
    /** Padding-bottom attribute, for example 100px */
    paddingBot?: string,
    /** Padding-top attribute, for example 100px */
    paddingTop?: string,
    // == Other ==
    /** If framework styles should be applied on content, default is "false" */
    styled?: boolean,
    /** Where should be headlines aligned. If not given, default will be middle */
    headline_align?: "left" | "right",
    /** Background attribute (color, gradient) of Left line. Line will not be displayed if empty */
    line?: string,
    /** Cutsom classnames for Section component */
    className?: string,
    /** Custom ID for Section component */
    id?: string,

    children?: any,
}

interface PartProps {
    bg?: string,
    color?: string,
    paddingBot?: string,
    paddingTop?: string,
    styled?: boolean,
    line?: string,
    children?: any,
}

//In section must be one of "parts" - Full/Half/row
/**
 * @enum {section_types}
 */
enum section_types {
    Full = "full",
    Half = "half",
    Row = "full row",
}

/**
 * Generates one of parts
 * @param {section_types} type Full/Half/Row
 * @param {*} props 
 */
function Part(type: section_types, props: PartProps) {
    let styles = {
        background: (!!props.bg ? props.bg : "transparent") + " center",
        backgroundSize: "cover",
        color: !!props.color ? props.color : "#inherit",
        paddingBottom: !!props.paddingBot ? props.paddingBot : "",
        paddingTop: !!props.paddingTop ? props.paddingTop : "",
    }
    let classes: string = type;
    if (!!props.styled) classes += " styled";
    //left line, is not displayed by default
    let line_styles = {
        display: "none",
        background: ""
    }
    if (!!props.line) {
        line_styles.background = props.line;

    }
    return (
        <div className={classes} style={styles}>
            {props.children}
            <div className="line" style={line_styles}></div>
        </div>);
}

//Will be 100% width
const Full = (props: PartProps) => {
    return Part(section_types.Full, props);
}

//will cover 50% of width
const Half = (props: PartProps) => {
    return Part(section_types.Half, props);
}

//will cover 100% of with, styled for elements displayed next to each other
//e.g. for Card component
const Row = (props: PartProps) => {
    return Part(section_types.Row, props);
}

export { Row, Full, Half };
export default Section;