import React from 'react';
import PropTypes from 'prop-types';
import './ImageSection.scss';

const ImageSection = (props) => {

  let backgroundStyle;

  if (props.parallax) {
    backgroundStyle = props.bg + " no-repeat fixed center center";
  } else {
    backgroundStyle = props.bg + " no-repeat scroll center center"
  }

  let containerStyles = {
    background:       props.background    ? props.background                  : "white",
    paddingTop:       props.paddingTop    ? props.paddingTop                  : "50px",
    paddingBottom:    props.paddingBot    ? props.paddingBot                  : "50px",
    marginTop:        props.marginTop     ? props.marginTop                   : "0px",
    marginBop:        props.marginBottom  ? props.marginBottom                : "0px",
    background:       props.bg            ? backgroundStyle                   : ""
  }

  let txt_styles = {
    color:          props.color       ? props.color       : "black"
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


  // == versions ==
  // Version is an array of inner components.


  /**  
   * Generates a text content of an image section.
  */
  function getTxtSection(includeInClass) {
    let classes = generateClassesStr([ "txt-section", includeInClass ]);

    return (
      <div 
        style={ txt_styles } 
        className={ classes }>
            
        { props.children }
      </div>
    )
  }

  /**
   * Generates a line *next to/below* the text.
   */

  let line;

  if ( !! props.line ) {
    line = <div className={ generateClassesStr([ "line", !! props.orientation ? "line-" + props.orientation : "line-left" ]) } style={{ backgroundColor: props.line }}></div>
  }

  // v1
  
  /**
   * Version with **text**.
   */
  let v1 = [
    <div 
      className={ generateClassesStr(["positioning-wrapper", !! props.orientation ? "positioning-wrapper-" + props.orientation : "positioning-wrapper-left"]) }>

        <div className={ generateClassesStr(["content-wrapper", !! props.orientation ? "content-wrapper-" + props.orientation : "content-wrapper-left"]) }>
          { line }
          { getTxtSection([ !! props.orientation ? "content-align-" + props.orientation : "content-align-left" ]) }
        </div>
    </div>
  ];

  // v2
  
  /**
   * Version with **image next to text**.
   */
  let v2 = [
    <div 
      className={ generateClassesStr([
        "positioning-wrapper", 
        !! props.orientation    ? "positioning-wrapper-"        + props.orientation     : "positioning-wrapper-left",
        !! props.positionMobile ? "positioning-wrapper-mobile-" + props.positionMobile  : "positioning-wrapper-mobile-top" ]) }>

        {/* Text half */}
        <div className="text-half" style={{ background: !! props.bgBehindText ? props.bgBehindText : "" }}>
          <div className={ generateClassesStr([
            "content-wrapper", 
            !! props.orientation      ? "content-wrapper-"    + props.orientation     : "content-wrapper-left", 
            !! props.textAlignMobile  ? "text-align-mobile-"  + props.textAlignMobile : "text-align-mobile-left"]) }>

            { line }
            { getTxtSection([ !! props.orientation ? "content-align-" + props.orientation : "content-align-left" ]) }
          </div>
        </div>

        {/* Image half */}
        <div className="img-half" style={{ 
          backgroundImage:      `url(${ props.img })`, 
          backgroundSize :      !! props.backgroundSize     ? props.backgroundSize      : "contain",
          backgroundPosition:   !! props.backgroundPosition ? props.backgroundPosition  : "center"  
        }}></div>
    </div>
  ];

  // == main container stuff ==

  let containerClasses = generateClassesStr([ 
    "version-container", 
    !! props.version ? props.version + "-version-container" : "v1-version-container" ]);


  return (
    <div
      id={ props.ID }
      className="img-section-container"
      style={ containerStyles }>

      <div className={ containerClasses }>
        { props.version ? eval(props.version) : v1 }
      </div>
    </div>
  );
}

ImageSection.propTypes = {
  /**
    * Content of the **text section** (*text, buttons, etc.*).
    * 
    * It is a **standard prop** - this prop apply to every version of the image section. 
    * 
    * **Styled** tags: `h2`, `p`. You can put anything into this section.
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
   * **Unique name** for this section. It can be used when navigating though the website.
   * 
   * It is a **standard prop** - this prop apply to every version of the image section.
   */
  ID:                 PropTypes.string,

  /** 
   * Defines a version applied on image section. Currently there are 3 available version. 
   * 
   * It is a **standard prop** - this prop apply to every version of the image section.
   * 
   * > Possible values:
   * * **v1** - Version with only **text**.
  */
  version:            PropTypes.oneOf([ "v1" ]),

  /** 
   * **Position of the text** section. 
   * 
   * ! Value **center** may not be valid for all versions.
   * 
   * It is a **standard prop** - this prop apply to every version of the image section.
  */
  orientation:        PropTypes.oneOf("left", "right", "center"), 

  /**
   * Value: color code
   * 
   * If the value is setted, it will draw a line *next to/below* the pharagraph.
   */
  line:               PropTypes.string,

  /**
   * CSS value for background.
   */
  background:         PropTypes.string,

  /** Value for css style padding-top.*/
  paddingTop:         PropTypes.string,

  /** Value for css style padding-bottom.*/
  paddingBot:         PropTypes.string,

  /** Color of the text */
  color:              PropTypes.string,

  /** Value for CSS style background-position.
   * @default "center"
   */
  backgroundPosition: PropTypes.string,

  /** Value for CSS style background-size.
   * @default "contain"
   */
  backgroundSize:     PropTypes.string,

  /** Value for CSS style text-align on smaller screen.
   * @default "left"
   */
  textAlignMobile:    PropTypes.string,

  /** Image for the image section.
   * @example
   * <ImageSection
   *    img={ require('./path/to/img.png') }>
   * ...
   * </ImageSection>
   */
  img:                PropTypes.string, 

  /** Position of the text on mobile relative to the image. */
  positionMobile:     PropTypes.oneOf("top", "bot"),

  /** Value for CSS style margin-top.
   * @default "0"
   */
  marginTop:          PropTypes.string,
  
  /** Value for CSS style margin-bottom.
   * @default "0"
   */
  marginBot:          PropTypes.string,

  /** Background of the whole image section. */
  bg:                 PropTypes.string,

  /** Background color for the section behind text (currently available only in version 2) */
  bgBehindText:       PropTypes.string,

  /** Creates parallax effect on background. */
  parallax:           PropTypes.bool
}

export default ImageSection;