/**
 *  @fileOverview Contains ContactInfo component and nesesary functions
 *  @author       Jan Škvařil    <jan.skvaril@gabros.cz>
 */

import React from 'react';
import './ContactInfo.scss';
import { Phone, PhoneAndroid, EmailOutlined, LocationOn, Facebook, Instagram } from '@material-ui/icons';
/**
 * @brief Creates react fragment from number and ads hard spaces between every 3 numbers
 * @param {string}  phone_number phone number in 111222333 format
 * @returns {ReactFragment} React.Fragment with phone number
 */
function getPhoneNumberString(phone_number: string) {
    return (
        <React.Fragment>
            &nbsp;{phone_number.substring(0, 3)}&nbsp;{phone_number.substring(3, 6)}&nbsp;{phone_number.substring(6, 9)}
        </React.Fragment>)

}

/**
 * @brief Wraps data in table and contact-info-section div
 * @param {Comment} data rows, that should be wrapen in table
 * @returns contact info section div containing table   
 */
function wrapWithSectionTable(data: JSX.Element[]) {
    return (
        <div className="contact-info-section">
            <table>
                <tbody>
                    {data}
                </tbody>
            </table>
        </div>)

}

/**
 * @brief Contact info is used for displaing things like phone numbers, emails, adressess etc. 
 * @version   2.3.0
 * 
 * **Example**
 * ```jsx
 * <ContactInfo
 *       email={[
 *           "same_mail",
 *           "different mail"
 *       ]}
 *       phone={[
 *           {name:"Phone:",number:"777555777"},
 *           {name:"Phone 2:",number:"777555777"}
 *       ]}
 *       place="Adress 123"
 *       facebook="https://www.facebook.com/SameUrl"
 *   />
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
    let sections = createContactSections(props);


    return (
        <div className="contact-info" style={styles}>
            {sections}
        </div>
    );
}

interface Props {
    // == styles ==
    /** If shadow should be displayed around section */
    shadow?: boolean,
    /** Background attribute of the section, can be color, image, gradient,... */
    bg?: string,
    /** Text color */
    color?: string,
    /** Background-size attribute, default is "cover" */
    bgSize?: string,
    // == functional ==
    /** Phone number. Array of object containing "name" and "number" */
    phone?:
    {
        /** name of the person */
        name: string,
        /** phone number */
        number: string
    }[]
    ,
    /** Phone number with mobile icon. Array of object containing "name" and "number" */
    mobile?: {
        /** name of the person */
        name: string,
        /** phone number */
        number: string
    }[],
    /** Email adress. Array of strings - email adresses */
    email?: string[],
    /** Real adress, Object containing text that will be displayed, and link to google maps */
    place?: {
        /** displayed text */
        text: string,
        /** redirect link  */
        link: string,
    },
    /** Facebook url */
    facebook?: string,
    /** Instagram url */
    instagram?: string,
    /** Anything else, without icon. Array of object containing "name" and "text" */
    other?: {
        /** Left part */
        name: string,
        /** Right part */
        text: string
    }[],
}

/**
 * Genertates all sections for contact info
 * @param {*} props 
 * @returns all sections in one array
 */
function createContactSections(props: Props) {
    let sections = [];
    //phones (
    if (!!props.phone) {
        let rows = [];
        for (let item of props.phone) {
            rows.push(
                <tr>

                    <td className="left">{item.name}</td>
                    <td className="right">
                        <a href={"tel:" + props.phone}>
                            <strong>
                                <Phone fontSize="small" className="text-icon" />
                                {getPhoneNumberString(item.number)}
                            </strong>
                        </a>
                    </td>

                </tr>
            )
        }
        sections.push(wrapWithSectionTable(rows));
    }
    //mobile
    if (!!props.mobile) {
        let rows = [];
        for (let item of props.mobile) {
            rows.push(
                <tr>

                    <td className="left">{item.name}</td>
                    <td className="right">
                        <a href={"tel:" + props.mobile}>
                            <strong>
                                <PhoneAndroid fontSize="small" className="text-icon" />
                                {getPhoneNumberString(item.number)}
                            </strong>
                        </a>
                    </td>

                </tr>
            )
        }
        sections.push(wrapWithSectionTable(rows));
    }
    //email adress
    if (!!props.email) {
        let rows = [];
        for (let item of props.email) {
            rows.push(
                <tr>
                    <td>
                        <a href={"mailto:" + item}>
                            <strong><EmailOutlined fontSize="small" className="text-icon" />&nbsp;{item}</strong>
                        </a>
                    </td>

                </tr>
            )
        }
        sections.push(
            wrapWithSectionTable(rows)

        );
    }
    //place / adress
    if (!!props.place) {
        sections.push(
            <div className="contact-info-section">
                <a href={props.place.link}>
                    <LocationOn fontSize="small" className="text-icon" />&nbsp;{props.place.text}
                </a>
            </div >
        );
    }
    //url to facebook page
    if (!!props.facebook) {
        sections.push(
            <div className="contact-info-section">
                <a href={props.facebook} target="_blank">
                    <Facebook fontSize="small" className="text-icon" />&nbsp;Facebook
                </a>
            </div>
        );
    }
    //url to instagram page
    if (!!props.instagram) {
        sections.push(
            <div className="contact-info-section">
                <a href={props.instagram} target="_blank">
                    <Instagram fontSize="small" className="text-icon" />&nbsp;Instagram
                </a>
            </div>
        );
    }
    //anything else
    if (!!props.other) {
        let rows = [];
        for (let item of props.other) {
            rows.push(
                <tr>
                    <td className="left">{item.name}</td>
                    <td className="right">
                        <strong>
                            {item.text}
                        </strong></td>
                </tr>
            )
        }
        sections.push(wrapWithSectionTable(rows));
    }
    return sections;
}

export default ContactInfo;