/**
 *  @fileOverview Footer compponent
 *
 *  @author       Jan Škvařil    <jan.skvaril@gabros.cz>
 */

import React from 'react';
import './Footer.scss';

/**
 * @brief This is footer component containing ad to our team, that we use for websites created by this ¨
 * framework.
 * @version   2.2.2
 * **Example**
 * ```jsx
 *<Footer
 *  bg="white"
 *  color="rgba(0,0,0,0.65)"
 *  logo={require("./imgs/logo.svg")}
 *  >
 *      <p>Some text</p>
 *  </Footer>
 *   ```
 */
const Footer = (props: Props) => {
    let styles = {
        background: (!!props.bg ? props.bg : "#ffffff") + " center",
        backgroundSize: "cover",
        color: !!props.color ? props.color : "#000000",
    }
    return (
        <div className="footer" style={styles}>
            <div className="container">
                <div className="img_holder">
                    <img src={props.logo} />
                </div>
                <div className="text_holder">
                    <p>{props.children}</p>
                </div>


            </div>
        </div>
    );
}
interface Props {
    /**
    * **Can be in:** root
    */
    /** Background attribute of the section, can be color, image, gradient,... */
    bg?: string,
    /** Text color */
    color?: string,
    /** Path (with require) to image or svg */
    logo?: string,

    children?: any,
}

export default Footer;