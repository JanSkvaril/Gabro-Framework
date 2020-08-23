/**
 *  @fileOverview Contains ContactInfo component and nesesary functions
 *  @author       Jan Škvařil    <jan.skvaril@gabros.cz>
 */

import React from 'react';
import './ContactInfo.scss';
import { Phone, PhoneAndroid, EmailOutlined, LocationOn, Facebook } from '@material-ui/icons/';
import PropTypes from 'prop-types';
/**
 * @brief Creates react fragment from number and ads hard spaces between every 3 numbers
 * @param {string}  phone_number phone number in 111222333 format
 * @returns {ReactFragment} React.Fragment with phone number
 */
function getPhoneNumberString(phone_number) {
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
function wrapWithSectionTable(data) {
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
 * @example 
 * <ContactInfo
        email={[
            {"same_mail"},
            {"different mail"}
        ]}
        phone={[
            {name:"Phone:",number:"777555777"},
            {name:"Phone 2:",number:"777555777"}
        ]}
        place="Adress 123"
        facebook="https://www.facebook.com/SameUrl"
    />
 */
const ContactInfo = (props) => {
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

ContactInfo.propTypes = {
    // == styles ==
    /** If shadow should be displayed around section */
    shadow: PropTypes.bool,
    /** Background attribute of the section, can be color, image, gradient,... */
    bg: PropTypes.string,
    /** Text color */
    color: PropTypes.string,
    /** Background-size attribute, default is "cover" */
    bgSize: PropTypes.string,
    // == functional ==
    /** Phone number. Array of object containing "name" and "number" */
    phone: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,     //name of the person
            number: PropTypes.string    //phone number
        })
    ),
    /** Phone number with mobile icon. Array of object containing "name" and "number" */
    mobile: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,     //name of the person
            number: PropTypes.string    //phone number
        })
    ),
    /** Email adress. Array of strings - email adresses */
    email: PropTypes.arrayOf(
        PropTypes.string
    ),
    /** Real adress, Object containing text that will be displayed, and link to google maps */
    place: PropTypes.shape({
        text: PropTypes.string, //displayed text
        link: PropTypes.string, //redirect link
    }),
    /** Facebook url */
    facebook: PropTypes.string,
    /** Anything else, without icon. Array of object containing "name" and "text" */
    other: PropTypes.arrayOf(
        PropTypes.shape({
            /** Left part */
            name: PropTypes.string,
            /** Right part */
            text: PropTypes.string
        })
    ),
}

/**
 * Genertates all sections for contact info
 * @param {*} props 
 * @returns all sections in one array
 */
function createContactSections(props) {
    let sections = [];
    //phones (
    if (!!props.phone) {
        let rows = [];
        for (let item of props.phone) {
            rows.push(
                <tr>
                    <a href={"tel:" + props.phone}>
                        <td className="left">{item.name}</td>
                        <td className="right">
                            <strong>
                                <Phone fontSize="small" className="text-icon" />
                                {getPhoneNumberString(item.number)}
                            </strong></td>
                    </a>
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
                    <a href={"tel:" + props.mobile}>
                        <td className="left">{item.name}</td>
                        <td className="right">
                            <strong>
                                <PhoneAndroid fontSize="small" className="text-icon" />
                                {getPhoneNumberString(item.number)}
                            </strong></td>
                    </a>
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
                    <a href={"mailto:" + props.email}>
                        <td>
                            <strong><EmailOutlined fontSize="small" className="text-icon" />&nbsp;{item.email}</strong>
                        </td>
                    </a>
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
    //anything else
    if (!!props.other) {
        let rows = [];
        for (let item of props.mobile) {
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