/** 
 *  @fileOverview File which handles and generates the landing page.
 *
 *  @author       Nikol Skvarilova  <skvarilovanikol@gmail.com>
 */

import React from 'react';
import { IconButton } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons/';
import './LandingPage.scss';
import PropTypes from 'prop-types';

/**
 * The landing page component.
 * 
 * @version   2.2
 */
const LandingPage = (props) => {

    // STYLES
    
    /** **Styles** for the whole **landing page**. */ 
    let container_styles = {
        boxShadow:       !! props.shadow    ? "0px 0px 77px -16px rgba(0,0,0,0.75)"     : "none",
        background:         props.bg        ? props.bg                                  : "#407BFF",
        backgroundSize:     props.bgSize    ? props.bgSize                              : "cover",
        zIndex:          !! props.shadow    ? 5                                         : -1   
    }

    /** **Styles** for the **text section**. */
    let txt_styles = {
        color:              props.color     ? props.color                               : "#1C1C1C",
        textShadow:      !! props.txtShadow ? "0px 0px 4px rgba(0, 0, 0, 0.54)"         : "",
    }    


    // COMPONENTS

    /** 
     * **Icon** for scrolling down to another section.
     * 
     * **Icon won't be shown** when the user does not provide link prop.
     */
    let scrollDownIcon;

    if ( !! props.link ) {
        scrollDownIcon = 
            <IconButton 
                className="icon-title" 
                href={ props.link } 
                style={{ color: !! props.iconColor ? props.iconColor : "white" }}>
                            
                <KeyboardArrowDown fontSize="large" />
            </IconButton>
    }
     

    // VERSIONS
    // Version is an array of inner containers.
    // Each version has a text-section and scrollDownIcon. 

    /**  
     * Generates a text section of the landing page.
     * @param {Array} includeInClass - Array of string which should be classes for the text container (section). For example you can pass some props into it for text alignment etc.
    */
    function getTxtSection(includeInClass) {
        let classes = "txt-section ";

        if ( includeInClass ) {
            includeInClass.forEach( element => {
                classes = classes + " " + element
            });
        }

        return (
            <div 
                style={ txt_styles } 
                className={ classes }>
                    
                { props.children }
            </div>
        )
    }

    // v1

    /**
     * Version with **text, scrollDownIcon**.
     */
    let v1 = [
        getTxtSection([ props.orientation ]),
        scrollDownIcon
    ]

    // v2

    /**
     * Version with **text, scrollDownIcon, image**.
     */
    let v2 = [
        <div 
            className={ 
                `container 
                ${ !! props.orientation         ? props.orientation         : "left" } 
                ${ !! props.orientationMobile   ? props.orientationMobile   : "top"  }` }>
            
            { getTxtSection() }

            <div 
                className="img-section" 
                style={{ backgroundImage: `url(${ props.img })` }}>
                
            </div>
        </div>,

        scrollDownIcon
    ]

    // v3

    /**
     * Version with **text** in a container called `block`, which can have some specific **shape and background color**, **scrollDownIcon**.
     */
    let v3 = [
        <div
        className={ 
            `container 
            ${ !! props.orientation ? props.orientation : "left"} 
            ${ !! props.orientationMobile ? props.orientationMobile : "top"} 
            ${ !! props.blockOrientation ? "block-" + props.blockOrientation + "-" + props.orientation : "block-top-" + props.orientation } `}>

            <div 
                className={ `block ${ !! props.blockShape ? props.blockShape : "square" }`} 
                style={{ background: !! props.blockColor ? props.blockColor : "rgba(33, 33, 33, 0.5)" }}>

                { getTxtSection() }

            </div >
        </div>,

        scrollDownIcon
    ]

    return (
        <div 
            className={ `landing-page ${ !! props.version ? props.version : "" }` } 
            style={ container_styles } 
            id="landing-page">

            { props.version ? eval(props.version) : v1 }

        </div>
    );
}


LandingPage.propTypes = {
   /**
     * Content of the **text section** (*text, buttons, etc.*).
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page. 
     * 
     * **Styled** tags: `h1`, `h2`, `p`. You can put anything into this section.
     * 
     * @example
     * <Component>
     *   <h1>Heading 1</h1>
     *   <h2>Heading 2</h2>
     *   <p>Some text goes here.</p>
     * </ Component>
     */
    children:           PropTypes.oneOfType([
                            PropTypes.arrayOf(PropTypes.node),
                            PropTypes.node
                        ]).isRequired,   

    /** 
     * If mentioned, landing page will cast **a shadow on other sections**.  
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
     * 
     * @default     false
     * 
     * @example
     * <LandingPage
     *   shadow>
     *   ...
     * </LandingPage>
    */
    shadow:             PropTypes.bool,    

    /** 
     * **Link for the little arow** on bottom of the landing page. 
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
     * 
     * > Possible values:
     * * URLs, IDs of other sections, etc.
     * 
     * @example
     * <LandingPage
     *   link="#about_us">
     *   ...
     * </LandingPage>
    */
    link:               PropTypes.string,   

    /** 
     * **Background** of the landing page. It can be *a color, a gradient, an image, etc.* 
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
     * 
     * > Possible values:
     * * RGB, RGBA, HEX, name of the color (*white, red, black*), anything you can describe color with.
     * 
     * @default     "#407BFF"
     * 
     * @example
     * <LandingPage
     *   // bg="rgb(5, 25, 88)"
     *   bg="red">
     *   ...
     * </LandingPage> 
    */
    bg:                 PropTypes.string,   

    /** 
     * **Color of the text** in the text section. This color will be applied on every text in the section. 
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
     * 
     * If you want a **different color for specific part of the text content, use **in-line styles**.
     * 
     * > Possible values:
     * * RGB, RGBA, HEX, name of the color (*white, red, black*), anything you can describe color with.
     * 
     * @default     "#1C1C1C"
     * 
     * @example
     * <LandingPage
     *   color="red">
     *   <h1 style={{ color: "white" }}>Heading with a different color</h1> // Using in-line styles
     * </LandingPage> 
    */
    color:              PropTypes.string, 

    /** 
     * CSS value for `background-size`.
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
     * 
     * > Possible values:
     * * **auto** - The background image is displayed in its original size.
     * * ***length*** - Sets the width and height of the background image. The first value sets the width, the second value sets the height. If only one value is given, the second is set to "auto".
     * * ***percentage*** - Sets the width and height of the background image in percent of the parent element. The first value sets the width, the second value sets the height. If only one value is given, the second is set to "auto".
     * * **cover** - Resize the background image to cover the entire container, even if it has to stretch the image or cut a little bit off one of the edges.
     * * **contain** - 	Resize the background image to make sure the image is fully visible.
     * * **intial** - Sets this property to its default value.
     * * **inherit** - 	Inherits this property from its parent element.
     * 
     * Definitions of those values is from [w3schools](https://www.w3schools.com/cssref/css3_pr_background-size.asp).
     *  
     * @default cover
     * 
     * @example
     * <LandingPage
     *   bgSize="auto">
     *   ...
     * </LandingPage>                     
    */
    bgSize:             PropTypes.string,   

    /** 
     * Defines a version applied on landing page. Currently there are 3 available version. 
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
     * 
     * > Possible values:
     * * **v1** - Version with only **text** and **scroll-down icon**.
     * * **v2** - Version with **text**, **scroll-down icon** and an **image**.
     * * **v3** - Version with **text** in a container called `block`, which can have some specific **shape and background color**, **scrollDownIcon**.
     *
     * @example
     * <LandingPage
     *   version="v2">
     *   ...
     * </LandingPage> 
    */
    version:            PropTypes.string,   

    /** 
     * **Position of the text** section on the landing page. 
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
     * 
     * > Possible values: 
     * * **left** - text is aligned to the left; 
     * * **right** - text is aligned to the right.
     * @example
     * <LandingPage
     *   orientation="left">
     *   ...
     * </LandingPage> 
    */
    orientation:        PropTypes.string, 

    /** 
     * **Color** of the scroll down **icon**. 
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
     * 
     * > Possible values:
     * * RGB, RGBA, HEX, name of the color (*white, red, black*), anything you can describe color with.
     * 
     * @example
     * <LandingPage
     *   iconColor="white">
     *   ...
     * </LandingPage> 
    */
    iconColor:          PropTypes.string, 

    /** 
     * **Color** of the **block**. 
     * 
     * This props is avalilable for these versions: v3.
     * 
     * > Possible values:
     * * RGB, RGBA, HEX, name of the color (*white, red, black*), anything you can describe color with.
     * 
     * @example
     * <LandingPage
     *   blockColor="rgba(20, 20, 20, 0.5)">
     *   ...
     * </LandingPage> 
    */
    blockColor:         PropTypes.string, 

    /** 
     * **Orientation of the block** - when `blockShape=crossed`, should the wider side be on top or bottom? 
     * 
     * This props is avalilable for these versions: v3.
     * 
     * > Possible values: 
     * * **top** - wider path is on top, 
     * * **bot** - widet path is on bottom.
     * 
     * This will be ignored if the `blockShape` prop is symmetrical.
     * 
     * @example
     * <LandingPage
     *   blockorientation="left">
     *   ...
     * </LandingPage>
    */
    blockOrientation:   PropTypes.string, 

    /** 
     * If mentioned, text in the text-section will cast **a shadow** on the background.
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
     * 
     * @default     false
     * 
     * @example
     * <LandingPage
     *   shadow>
     *   ...
     * </LandingPage>
    */
    txtShadow:          PropTypes.bool, 

    /** 
     * **Shape of the block**. 
     * 
     * This props is avalilable for these versions: v3.
     * 
     * > Possible values: 
     * * **square** - well, it is a **square** (rectangle maybe); 
     * * **crossed** - it is some kind of **trapezoid**.
     * 
     * @example 
     * <LandingPage
     *   blockShape="square">
     *   ...
     * </LandingPage>
    */
    blockShape:         PropTypes.string,   

    /**
     * **Orientation** of the **text section** on **smaller screen size**. 
     * 
     * This props is avalilable for these versions: v2, v3.
     * 
     * > Possible values:
     * * **top** - the text section is positioned on top of the landing page.
     * * **bot** - the text section is positioned on bottom of the landing page.
     * 
     * @example 
     * <LandingPage
     *   orientationMobile="top">
     *   ...
     * </LandingPage>
     */
    orientationMobile:  PropTypes.string,  
}

export default LandingPage;