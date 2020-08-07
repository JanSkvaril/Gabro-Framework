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

    // Generates a text section of the Landing Page
    // param includeInClass:arr - array of string which should be classes for the text container.
    //      For example you can pass some props into it for text alignment etc.
    //      Usage: getTxtSection([ props.orientation, props.txtAlignMobile ])
    function getTxtSection(includeInClass) {

        let classes = "";

        if ( includeInClass ) {
            includeInClass.forEach( element => {
                classes = classes + " " + element
            });
        }

        return (
            <div 
                style={ txt_styles } 
                className={ `txt-section ${ classes }` }>
                    
                { props.children }
            </div>
        )
    }

    // v1

    let v1 = [
        getTxtSection([ props.orientation ]),
        scrollDownIcon
    ]

    // v2

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

    let v3 = [
        <div
        className={ 
            `container ${ !! props.orientation ? props.orientation : "left"} ${ !! props.orientationMobile ? props.orientationMobile : "top"} `}>

            <div 
                className="block" 
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
}

export default LandingPage;