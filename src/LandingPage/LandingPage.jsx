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
 * @example
 * <LandingPage
 *  shadow
 *  txtShadow
 *  link="#about_us" 
 *  bg="linear-gradient(#5918b6, #7b1fa2)"
 *  version="v3"
 *  color="white"
 *  orientation="left"
 *  img={ require('./images/my.png') }
 *  orientationMobile="bot"
 *  iconColor="white"
 *  blockColor="rgba(33, 33, 33, 0.5)"
 *  blockOrientation="bot"
 *  blockShape="square"> 
 *
 *  <h1>Lorem Ipsum.</h1>
 *  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elt.</p>     
 *  </ LandingPage>
 */
const LandingPage = (props) => {

    // == styles ==
    
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


    // == general functions ==

    /**  
     * Generates a string of classes for a section.
     * 
     * @param {Array} includeInClass - Array of string which should be classes for the section or anything.
     */
    function generateClassesStr(includeInClass) {
        let classes = "";

        if ( includeInClass ) {
            includeInClass.forEach( element => {
                classes = classes + " " + element
            });
        }

        return classes
    }


    // == components ==

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
     

    // == versions ==
    // Version is an array of inner containers.
    // Each version has a text-section and scrollDownIcon. 

    /**  
     * Generates a text section of the landing page.
    */
    function getTxtSection(includeInClass) {
        let classes = generateClassesStr([ "txt-section", includeInClass ]) ;

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
            className={ generateClassesStr([
                "container",
                !! props.orientation         ? props.orientation         : "left",
                !! props.orientationMobile   ? props.orientationMobile   : "top"
            ])}>
            
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
            className={ generateClassesStr([ 
                "container", 
                !! props.orientation ? props.orientation : "left",
                !! props.orientationMobile ? props.orientationMobile : "top",
                !! props.blockOrientation ? "block-" + props.blockOrientation + "-" + props.orientation : "block-top-" + props.orientation,
            ])}>

            <div 
                className={ generateClassesStr([ "block", !! props.blockShape ? props.blockShape : "square" ]) } 
                style={{ background: !! props.blockColor ? props.blockColor : "rgba(33, 33, 33, 0.5)" }}>

                { getTxtSection() }

            </div >
        </div>,

        scrollDownIcon
    ]

    return (
        <div 
            className={ generateClassesStr([ "landing-page", !! props.version ? props.version : "", !! props.className ? props.className : "" ]) } 
            style={ container_styles } 
            id={`landing-page ${ !! props.id ? props.id : "" }`}>

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
    */
    bg:                 PropTypes.string,   

    /** 
     * **Color of the text** in the text section. This color will be applied on every text in the section. 
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
     * 
     * If you want a **different color for specific part of the text content, use **in-line styles**.
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
     * Definitions of the possible values can be find on [w3schools](https://www.w3schools.com/cssref/css3_pr_background-size.asp).
     *  
     * @default cover                   
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
    */
    version:            PropTypes.oneOf(["v1", "v2", "v3"]),   

    /** 
     * **Position of the text** section on the landing page. 
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
    */
    orientation:        PropTypes.oneOf("left", "right"), 

    /** 
     * **Color** of the scroll down **icon**. 
     * 
     * It is a **standard prop** - this prop apply to every version of the landing page.
    */
    iconColor:          PropTypes.string, 

    /** 
     * **Color** of the **block**. 
     * 
     * This props is avalilable for these versions: v3.
    */
    blockColor:         PropTypes.string, 

    /** 
     * **Orientation of the block** - when `blockShape=crossed`, should the wider side be on top or bottom? 
     * 
     * This props is avalilable for these versions: v3.
     * 
     * This will be ignored if the `blockShape` prop is symmetrical.
    */
    blockOrientation:   PropTypes.oneOf(["top", "bot"]), 

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
    */
    blockShape:         PropTypes.oneOf(["square", "crossed"]),   

    /**
     * **Orientation** of the **text section** on **smaller screen size**. 
     * 
     * This props is avalilable for these versions: v2, v3.
     */
    orientationMobile:  PropTypes.oneOf(["top", "bot"]),  

    /**Your custom classnames. */
    className:          PropTypes.string,
    
    /** ID of this section */
    id:                 PropTypes.string,
}

export default LandingPage;