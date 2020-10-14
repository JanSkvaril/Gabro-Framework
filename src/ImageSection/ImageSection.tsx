/**
 *  @fileOverview Image section component
 *
 *  @author       Nikol Škvařilová    <skvarilovanikol@gmail.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import './ImageSection.scss';
import { bg, color, filePath } from '../Types';

/**
 * @brief Simgle section with text part and image half. Section features multiple versions with different elements and compositions.
 * 
 * ## Example
 * ```jsx
 *  import GetImage from 'gabro_framework';
 * 
 * <ImageSection
 *    version="v2"
 *    color="#3E3E3E"
 *    line="#3E3E3E"
 *    orientation="left"
 *    img={ require('./path/to/image.jpg') }
 *    bg={ GetImage(require('./path/to/bg_image.jpg')) }
 *    backgroundSize="cover"
 *    imgEndToEndPhone
 *    parallax>
 *       
 *   Content
 * 
 * </ImageSection>
 * ```
 */
function ImageSection(props: Props): JSX.Element {

  let backgroundStyle;

  if (props.parallax) {
    backgroundStyle = props.bg + " no-repeat fixed center center";
  } else {
    backgroundStyle = props.bg + " no-repeat scroll center center"
  }

  let containerStyles = {
    background: backgroundStyle
  }

  let txt_styles = {
    color: props.color ? props.color : "black"
  }


  // == general functions ==

  /**  
   * Generates a string of classes for a section.
   * 
   * @param {Array} includeInClass - Array of string which should be classes for the section or anything.
  */
  function generateClassesStr(includeInClass: string[]) {
    let classes = "";

    if (includeInClass) {
      includeInClass.forEach(element => {
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
  function getTxtSection(includeInClass: string[]) {
    let classes = generateClassesStr(["txt-section"].concat(includeInClass));

    return (
      <div
        style={txt_styles}
        className={classes}>

        { props.children}
      </div>
    )
  }

  /**
   * Generates a line *next to/below* the text.
   */

  let line;

  if (!!props.line) {
    line = <div className={generateClassesStr(["line", !!props.orientation ? "line-" + props.orientation : "line-left"])} style={{ backgroundColor: props.line }}></div>
  }

  // v1

  /**
   * Version with **text**.
   */
  let v1 = [
    <div
      className={generateClassesStr(["positioning-wrapper", !!props.orientation ? "positioning-wrapper-" + props.orientation : "positioning-wrapper-left"])}>

      <div className={generateClassesStr(["content-wrapper", !!props.orientation ? "content-wrapper-" + props.orientation : "content-wrapper-left"])}>
        {line}
        {getTxtSection([!!props.orientation ? "content-align-" + props.orientation : "content-align-left"])}
      </div>
    </div>
  ];

  // v2

  /**
   * Version with **image next to text**.
   */
  let v2 = [
    <div
      className={generateClassesStr([
        "positioning-wrapper",
        !!props.orientation ? "positioning-wrapper-" + props.orientation : "positioning-wrapper-left",
        !!props.positionMobile ? "positioning-wrapper-mobile-" + props.positionMobile : "positioning-wrapper-mobile-top",
        !!props.block ? props.block + "-" + props.orientation : ""])}>

      {/* Text half */}
      <div className="text-half" style={{ background: !!props.bgBehindText ? props.bgBehindText : "" }}>
        <div className={generateClassesStr([
          "content-wrapper",
          !!props.orientation ? "content-wrapper-" + props.orientation : "content-wrapper-left",
          !!props.textAlignMobile ? "text-align-mobile-" + props.textAlignMobile : "text-align-mobile-left"])}>

          {line}
          {getTxtSection([!!props.orientation ? "content-align-" + props.orientation : "content-align-left"])}
        </div>
      </div>

      {/* Image half */}
      <div className={generateClassesStr(["img-half", !!props.imgEndToEndPhone ? "imgEndToEndPhone" : "", !!props.img ? "" : "hiddenImgHalf"])} style={{
        backgroundImage: `url(${props.img})`,
        backgroundSize: !!props.backgroundSize ? props.backgroundSize : "contain",
        backgroundPosition: !!props.backgroundPosition ? props.backgroundPosition : "center"
      }}></div>
    </div>
  ];


  // Object with versions
  let versions = {
    v1: v1,
    v2: v2
  }

  // == main container stuff ==

  let containerClasses = generateClassesStr([
    "version-container",
    !!props.version ? props.version + "-version-container" : "v1-version-container",
    !!props.paddingTop ? "img-section-paddingTop" : "",
    !!props.paddingBot ? "img-section-paddingBot" : ""]);


  return (
    <div
      id={props.ID}
      className="img-section-container">

      <div className={containerClasses} style={containerStyles}>
        {props.version ? versions[props.version] : v1}
      </div>
    </div>
  );
}

interface Props {
  /**
  * **Can be in:** root
  */
  /**
    * Content of the **text section** (*text, buttons, etc.*).
    * 
    * It is a **standard prop** - this prop apply to every version of the image section. 
    * 
    * **Styled** tags: `h2`, `p`. You can put anything into this section.
    * 
    * ## Example
    * ```jsx
    * <Component>
    *   <h1>Heading 1</h1>
    *   <h2>Heading 2</h2>
    *   <p>Some text goes here.</p>
    * </ Component>
    * ```
  */
  children?: any,

  /**
   * **Unique name** for this section. It can be used when navigating though the website.
   * 
   * It is a **standard prop** - this prop apply to every version of the image section.
   */
  ID?: string,

  /** 
   * Defines a version applied on image section. Currently there are 3 available version. 
   * 
   * > Possible values:
   * * `v1` - Version with only **text**.
   * * `v2` - Version with an **image** next to **text**.
  */
  version: string,

  /** 
   * **Position of the text** section. 
   * 
   * ! Value **"center"** is **only available for v1**.
   * 
   * > Possible values:
   * * `left` - text will be on the left.
   * * `right` - text will be on the right.
   * * `center` - text will be centered. This value is only **available for version 1**.
   * 
   * It is a **standard prop** - this prop apply to every version of the image section.
   * @default "left"
  */
  orientation?: string,

  /**
   * If the value (color code) is entered, it will draw a line *next to/below* the pharagraph.
   * 
   * It is a **standard prop** - this prop apply to every version of the image section. 
   */
  line?: color,

  /** If entered, 70px padding will be added to top.
   * 
   * It is a **standard prop** - this prop apply to every version of the image section. 
   * 
   * @default false
  */
  paddingTop?: boolean,

  /** If entered, 70px padding will be added to bottom.
   * 
   * It is a **standard prop** - this prop apply to every version of the image section. 
   * 
   * @default false
  */
  paddingBot?: boolean,

  /** Color of the text.
   * 
   * It is a **standard prop** - this prop apply to every version of the image section. 
   * 
   * @default "black"
   */
  color?: color,

  /** Value for CSS style background-position for the image in **version 2**.
   * @default "center" 
   */
  backgroundPosition?: string,

  /** Value for CSS style background-size for the image in **version 2**.
   * @default "contain"
   */
  backgroundSize?: string,

  /** Value for CSS style text-align on smaller screen. Currently available only in **version 2**.
   * @default "left"
   */
  textAlignMobile?: string,

  /** Image for the image section. Currently available only in **version 2**.
   * ## Example
   * ```jsx
   * <ImageSection
   *    img={ require('./path/to/img.png') }>
   *    
   *    ...
   * </ImageSection>
   * ```
   */
  img?: filePath,

  /** Position of the text on mobile relative to the image. Currently available only in **version 2**.
   * 
   * > Values
   * * `top` - text will be above image.
   * * `bot` - text will be below image.
   * 
   * @default "bot"
  */
  positionMobile?: string,

  /** Background of the whole image section.
   * 
   * It is a **standard prop** - this prop apply to every version of the image section. 
   * 
   * ## Example
   * ```jsx
   * <ImageSection
   *    bg={ `url(${ require('./path/to/img.png') })` } // image
   *    bg="red"> // color
   * 
   *    ...
   * </ImageSection>
   * ```
   * 
   * @default "white"
   */
  bg?: bg,

  /** **Background color** for the section behind text (currently available only in **version 2**). */
  bgBehindText?: bg,

  /** Creates **parallax effect** on background. 
   * 
   * It is a **standard prop** - this prop apply to every version of the image section. 
   * 
   * @default false
   */
  parallax: boolean,

  /** If entered, image will be end to end on smaller screens. Currently available only in **version 2**. 
   * 
   * @default false
  */
  imgEndToEndPhone: boolean,

  /** Available in **version 2**. It creates transition between the text section and image section.
   * 
   * > Values: 
   * * `beleved-top` - wider part is on the top.
   * * `beleved-bot` - wider parth is on the bottom.
   */
  block: string
}

export default ImageSection;