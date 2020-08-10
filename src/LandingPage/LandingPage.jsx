import React from 'react';
import { IconButton } from '@material-ui/core';
import { KeyboardArrowDown } from '@material-ui/icons/';
import './LandingPage.scss';
import PropTypes from 'prop-types';

const LandingPage = (props) => {

    // STYLES
    
    // Styles for the whole landing page
    let container_styles = {
        boxShadow:       !! props.shadow    ? "0px 0px 77px -16px rgba(0,0,0,0.75)"     : "none",
        background:         props.bg        ? props.bg                                  : "#407BFF",
        backgroundSize:     props.bgSize    ? props.bgSize                              : "cover",
        zIndex:          !! props.shadow    ? 5                                         : -1   
    }

    // Text styles
    let txt_styles = {
        color:              props.color     ? props.color                               : "#1C1C1C",
        textShadow:      !! props.txtShadow ? "0px 0px 4px rgba(0, 0, 0, 0.54)"         : "",
    }    


    // COMPONENTS

    // Icon for scrolling down to another section
    let scrollDownIcon;

    // Icon won't be shown when the user does not provide link prop
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
    //
    // I will provide lists of available props for each version. If you use a prop which is not supported for the version, it will be ignored.
    // Standard props (available for every version):
    //      shadow
    //      bg 
    //      bgSize
    //      color
    //      txtShadow
    //      link
    //      iconColor
    //      version
    // See more about these props in the documentation.

    function getTxtSection(includeInClass) {
        // Generates a text section of the Landing Page
        // param includeInClass:array - array of strings which should be classes for the text container (section).
        //      For example you can pass some props into it for text alignment etc.
        //      Usage: getTxtSection([ props.orientation, props.txtAlignMobile ])

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

    // Version with text, scrollDownIcon. 
    // Available props:
    //      orientation
    // See more about the prop in the documentation.
    let v1 = [
        getTxtSection([ props.orientation ]),
        scrollDownIcon
    ]

    // v2

    // Version with text, scrollDownIcon, image.
    // Available props:
    //      orientation
    //      orieantationMobile
    //      img
    // See more about these props in the documentation.
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

    // Version with text in a container called black, which can have some specific shape and background color, scrollDownIcon.
    // Available props:
    //      orientation
    //      orientationMobile
    //      blockOrientation
    //      blockShape
    //      blockColor
    // See more about these props in the documentation.
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
    children:           PropTypes.oneOfType([
                            PropTypes.arrayOf(PropTypes.node),
                            PropTypes.node
                        ]).isRequired,      // Text content
    shadow:             PropTypes.bool,     // Stín landing page
    link:               PropTypes.string,   // Kam má sjet šipečka
    bg:                 PropTypes.string,   // Pozadí landing page
    color:              PropTypes.string,   // Barva textu
    bgSize:             PropTypes.string,   // background-size (css), default cover
    textShadow:         PropTypes.bool,     // Stín textu
    version:            PropTypes.string,   // Která verze landing page
    orientation:        PropTypes.string,   // Zarovnání textu doprava/doleva
    iconColor:          PropTypes.string,   // Barva scroll down ikonky
    blockColor:         PropTypes.string,   // Barva blocku
    blockOrientation:   PropTypes.string,   // Orientace blocku (širší část nahoře nebo dole)
    txtShadow:          PropTypes.bool,     // Stín textu
    blockShape:         PropTypes.string,   // Tvar blocku
}

export default LandingPage;