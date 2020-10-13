/**
 *  @fileOverview Contains ContactInfo component and nesesary functions
 *  @author       Jan Škvařil    <jan.skvaril@gabros.cz>
 */

import React from 'react';
import './ContactInfo.scss';
import { Phone, PhoneAndroid, EmailOutlined, LocationOn, Facebook, Instagram } from '@material-ui/icons';

/**
 * @brief Contact info is used for displaing things like phone numbers, emails, adressess etc. 
 * @version   2.4.0
 * 
 * **Example**
 * ```jsx
 *  <ContactInfo>
 *      <ContactPhone name="Same Person" number="777 666 222" type="phone" />
 *      <ContactPhone name="Samone Else" number="666 888 777" type="mobile" />
 *      <ContactEmail email="emailaddress" />
 *      <ContactSocial type="facebook" url="https://googlemapsurl.com" />
 *  </ContactInfo>
 *   ```
 */
const ContactInfo = (props: Props) => {
    let styles = {
        boxShadow: !!props.shadow ? "0px 0px 77px -16px rgba(0,0,0,0.75)" : "none",
        background: !!props.bg ? props.bg : "transparent",
        zIndex: !!props.shadow ? 5 : 0,
        color: !!props.color ? props.color : "#000000",
        backgroundSize: !!props.bgSize ? props.bgSize : "cover",
    };



    return (
        <div className="contact-info" style={styles}>
            {props.children}
        </div>
    );
}

interface Props {
    /**
    * **Can be in:** Half, Full
    */
    /** If shadow should be displayed around section */
    shadow?: boolean,
    /** Background attribute of the section, can be color, image, gradient,... */
    bg?: string,
    /** Text color */
    color?: string,
    /** Background-size attribute, default is "cover" */
    bgSize?: string,

    children?: any,
}

/**
 * For displaying phone number. Will envoke call event of clients os on click
 */
export function ContactPhone(props: PhoneProps) {
    let icon;
    if (props.type == "mobile") {
        icon = <PhoneAndroid fontSize="small" className="text-icon" />
    }
    else {
        icon = <Phone fontSize="small" className="text-icon" />
    }
    let number = [];
    for (let char of props.number) {
        if (char == " ") {
            number.push(<React.Fragment>&nbsp;</React.Fragment>);
        }
        else number.push(char);
    }
    return (
        <div className="contact-info-section">
            <table>
                <tbody>
                    <tr>

                        <td className="left">{props.name}</td>
                        <td className="right">
                            <a href={"tel:" + props.number}>
                                <strong>
                                    {icon}
                                    {number}
                                </strong>
                            </a>
                        </td>

                    </tr>
                </tbody>
            </table>
        </div>
    )
}
interface PhoneProps {
    /**
    * **Can be in:** ContactInfo
    */
    /** Name of person/department coresponding to the number. Should not be long */
    name: string,
    /** Phone/Mobile number in any format */
    number: string,
    /** Icon displayed (phone or mobile) */
    type: "phone" | "mobile",
}
/**
 * For url of your social media page
 */
export function ContactSocial(props: SocialProps) {
    let text = "";
    let icon;
    if (props.type == "facebook") {
        text = "Facebook";
        icon = <Facebook fontSize="small" className="text-icon" />;
    }
    else {  //instagram
        text = "Instagram";
        icon = <Instagram fontSize="small" className="text-icon" />
    }
    return (
        <div className="contact-info-section">
            <a href={props.url} target="_blank">
                {icon}&nbsp;{text}
            </a>
        </div>
    )
}
interface SocialProps {
    /**
    * **Can be in:** ContactInfo
    */
    /** Url address to your social media page */
    url: string,
    /** Icon displayed (facebook or instagram) */
    type: "facebook" | "instagram"
}

/**
 * For displaying email address. Will envoke mail event of clients os on click
 */
export function ContactEmail(props: EmailProps) {
    return (
        <div className="contact-info-section">
            <table>
                <tbody>
                    <tr>
                        {props.name ? <td className="left">{props.name}</td> : ""}
                        <td className={props.name ? "right" : ""}>
                            <a href={"mailto:" + props.email}>
                                <strong><EmailOutlined fontSize="small" className="text-icon" />&nbsp;{props.email}</strong>
                            </a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
interface EmailProps {
    /**
    * **Can be in:** ContactInfo
    */
    /** Name of person/department coresponding to the email address. Not required*/
    name?: string,
    /** Email address */
    email: string,
}

/**
 * For displaying your address. If provided with *mapsUrl*, user can click on the address and it will redirect him to
 * google maps app (on mobile devices)
 */
export function ContactPlace(props: PlaceProps) {
    return (
        <div className="contact-info-section">
            <a href={props.mapsUrl}>
                <LocationOn fontSize="small" className="text-icon" />&nbsp;{props.address}
            </a>
        </div >
    )
}
interface PlaceProps {
    /**
    * **Can be in:** ContactInfo
    */
    /** Real-life address */
    address: string,
    /** URL to google maps */
    mapsUrl?: string
}

export default ContactInfo;