import React from 'react';
import PropTypes from 'prop-types';
import './ImageSection.scss';

const ImageSection = (props) => {

  // const checkImgMobileAlignment = (img_align, img_align_mobile) => {
  //   if (img_align_mobile == null) {
  //     if (img_align === "left") {
  //       return "top";
  //     } else {
  //       return "bot";
  //     }
  //   }

  //   return img_align_mobile;
  // };


  // // Styles of the main title
  // let titleStyles = {
  //   'color': !!props.title_color ? props.title_color : 'black'
  // };

  // // Styles of the subtitle
  // let subTitleStyles = {
  //   'color': !!props.sub_title_color ? props.sub_title_color : 'gray'
  // };

  // // Styles of the actual text
  // let textStyles = {
  //   'color': !!props.txt_color ? props.txt_color : 'black',
  // };

  // // Styles of the line next to paragraph
  // let lineStyles = {
  //   'background': !!props.line_color ? props.line_color : ""
  // };

  // let imgPositionClass = "";
  // if (props.img_position === "to_edge" && props.img_align === "left") {
  //   imgPositionClass = "to_edge_left_full_screen_mobile"
  // } else if (props.img_position === "to_edge" && props.img_align != "left") {
  //   imgPositionClass = "to_edge_right_full_screen_mobile"
  // } else {
  //   imgPositionClass = "img_center"
  // }

  // let textPadding = "";
  // if (props.img_align === "left") {
  //   textPadding = "img_on_the_left_from_text"
  // } else {
  //   textPadding = "img_on_the_right_from_text"
  // }

  // let imgSizeMobile = "";
  // if (!!props.img_full_width_mobile) {
  //   imgSizeMobile = "img_full_width_mobile"
  // } else {
  //   imgSizeMobile = "img_regular_width_mobile"
  // }

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

  let line;
  if ( !! props.line ) {
    line = <div className={ generateClassesStr([ "line", "line-" + props.orientation ]) } style={{ backgroundColor: props.line }}></div>
  }

  // v1
  
  /**
   * Version with **text**.
   */
  let v1 = [
    <div className={  generateClassesStr(["positioning-wrapper", props.orientation]) }>
      <div className={  generateClassesStr(["text-wrapper", props.orientation]) }>
        { line }
        { getTxtSection([ props.orientation ]) }
      </div>
    </div>
  ];


  /**
   * Version with **text** and an **image**.
   */
  let v2 = [
    <div className="wrapper">
      <div className="txt-container">
      { getTxtSection() }
      </div>,

      <div className="img-container"></div>
    </div>
  ];


  /**
   * Version with **text** and an **image** which is wide to the end of the page.
   */
  let v3 = [
    <div className="wrapper">
      <div className="txt-container">
      { getTxtSection() }
      </div>,

      <div className="img-container"></div>
    </div>
  ];

  // == main container stuff ==

  let containerClasses = generateClassesStr([ "text-section-container", !! props.version ? props.version + "_img-section" : "v1_img-section" ]);


  return (
    <div
      id={ props.ID }
      className={ containerClasses }>

      { props.version ? eval(props.version) : v1 }


    </div>
    // <div
    //   id={props.section_link}
    //   className={`text_section_container ${props.img_align} ${checkImgMobileAlignment(props.img_align, props.img_align_mobile)}`}>

    //   <div className="text_half_container">
    //     <div className={`text_half_wrapper ${textPadding}`}>
    //       {/* Rectangle thingy */}
    //       {!!props.line_color ? <div className="rectangle" style={lineStyles}></div> : ""}

    //       <div className="text_half">
    //         {/* Main Title */}
    //         {!!props.title ? <h1 className="text_section_title" style={titleStyles}>{props.title}</h1> : ""}

    //         {/* Subtitle */}
    //         {!!props.sub_title ? <h2 className="text_section_subtitle" style={subTitleStyles}>{props.sub_title}</h2> : ""}

    //         {/* Text */}
    //         <article className="text" style={textStyles}>
    //           {props.children}
    //         </article>
    //       </div>
    //     </div>
    //   </div>

    //   <div className={`img_half_container ${imgPositionClass}`}>
    //     <img
    //       className={`img_half ${imgSizeMobile}`}
    //       src={props.img}
    //       alt={props.alt}>
    //     </img>
    //   </div>
    // </div>
  );
}

ImageSection.propTypes = {
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
   * **Unique name** for this section. It can be used when navigating though the website.
   * 
   * It is a **standard prop** - this prop apply to every version of the landing page.
   */
  ID:                 PropTypes.string,

  /** 
   * Defines a version applied on image section. Currently there are 3 available version. 
   * 
   * It is a **standard prop** - this prop apply to every version of the landing page.
   * 
   * > Possible values:
   * * **v1** - Version with only **text**.
   * * **v2** - Version with **text** and an **image**.
   * * **v3** - Version with **text** and an **image** which is wide to the end of the page.
  */
  version:            PropTypes.oneOf([ "v1", "v2", "v3" ]),

  /** 
   * **Position of the text** section. 
   * 
   * It is a **standard prop** - this prop apply to every version of the landing page.
  */
  orientation:        PropTypes.oneOf("left", "right"), 
}

// ImageSection.propTypes = {
//   title: PropTypes.string,
//   sub_title: PropTypes.string,
//   text: PropTypes.string.isRequired,
//   title_color: PropTypes.string,
//   sub_title_color: PropTypes.string,
//   txt_color: PropTypes.string,
//   img: PropTypes.node.isRequired,
//   alt: PropTypes.string,
//   line_color: PropTypes.string, // If the color is not entered, the line is not rendered!
//   img_align: PropTypes.string, // The image is on the left/right from the text; values: 'left', 'right'; default: 'right'
//   img_align_mobile: PropTypes.string, // The image is on above/below the text; values: 'top', 'bot'; default: 'top'
//   img_position: PropTypes.string, // Values: 'to_edge' 
//   img_full_width_mobile: PropTypes.bool    // On the phone small-desktop screen and smaller, should the image be full-screen or not
// }

export default ImageSection;