import React from 'react'
import { IconButton } from '@material-ui/core';
import { KeyboardArrowDown, PortraitSharp } from '@material-ui/icons/';
import './LandingPage.scss';
import PropTypes from 'prop-types';

const LandingPage = (props) => {

    // let text_styles = {
    //     textShadow: !!props.textShadow ? "0px 0px 4px rgba(50, 50, 50, 1)" : "none"
    // }

    // let headline_variant = "header";
    // if (!!props.orientation) {
    //     if (props.orientation == "left")
    //         headline_variant = "header_left"
    // }
    // let block = "";
    // if (!!props.block) {
    //     block = <div className="block" style={{ background: props.block }}></div >
    // }

    // STYLES

    let container_styles = {
        boxShadow:       !! props.shadow    ? "0px 0px 77px -16px rgba(0,0,0,0.75)"     : "none",
        background:         props.bg        ? props.bg                                  : "#407BFF",
        backgroundSize:     props.bgSize    ? props.bgSize                              : "cover",
        zIndex:          !! props.shadow    ? 5                                         : -1   
    }

    let txt_styles = {
        color:              props.color     ? props.color                               : "#1C1C1C",
    }    


    // COMPONENTS
    let scrollDownIcon;

    if ( !! props.link ) {
        scrollDownIcon = <IconButton className="icon-title" href={ props.link }>
                            <KeyboardArrowDown fontSize="large" />
                        </IconButton>
    }
     

    // VERSIONS

    function getTxtSection(includeInClass) {
        let classes = "";
        if ( includeInClass ) {
            includeInClass.forEach( element => {
                classes = classes + " " + element
            });
        }

        return  <span style={ txt_styles } className={ `txt-section ${ classes }` }>
                    { props.children }
                </span>
    }

    // v1

    let v1 = [
        getTxtSection([ props.orientation ]),
        scrollDownIcon
    ]

    // v2

    let v2 = [
        <div className={ `container ${ !! props.orientation ? props.orientation : "" } ${ !! props.orientationMobile ? props.orientationMobile : "top" }` }>
            { getTxtSection() }
            <div className="img-section" style={{ backgroundImage: `url(${ props.img })` }}></div>
        </div>,
        scrollDownIcon
    ]
    


    return (
        <div className={ `landing-page ${ !! props.version ? props.version : "" }` } style={ container_styles } id="landing-page">

            {/* {block}
            <span className={headline_variant}>
                <h1 className="main-title" style={text_styles} >{props.title}</h1>
                <h2 className="secondary-title" style={text_styles}>  {props.secondaryTitle}</h2>
            </span> */}
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
}

export default LandingPage;