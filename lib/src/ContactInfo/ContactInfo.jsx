import React from 'react';
import './ContactInfo.scss';
import { Phone, PhoneAndroid, EmailOutlined, LocationOn, Facebook } from '@material-ui/icons/';
import { Link } from '@material-ui/core';

function getPhoneNumberString(string) {
    return (
        <React.Fragment>
            &nbsp;{string.substring(0, 3)}&nbsp;{string.substring(3, 6)}&nbsp;{string.substring(6, 9)}
        </React.Fragment>)

}
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

const ContactInfo = (props) => {
    let styles = {
        boxShadow: !!props.shadow ? "0px 0px 77px -16px rgba(0,0,0,0.75)" : "none",
        background: !!props.bg ? props.bg : "#ffffff",
        zIndex: !!props.shadow ? 5 : 0,
        color: !!props.color ? props.color : "#000000",
        backgroundSize: !!props.bgSize ? props.bgSize : "cover",
    };
    let sections = createContactSections(props);


    return (
        <div className="contact-info">
            {sections}
        </div>
    );
}

function createContactSections(props) {
    let sections = [];
    if (!!props.phone) {
        let rows = [];
        for (let item of props.phone) {
            rows.push(
                <tr>
                    <td className="left">{item.name}</td>
                    <td className="right">
                        <strong>
                            <Phone fontSize="small" className="text-icon" />
                            {getPhoneNumberString(item.number)}
                        </strong></td>
                </tr>
            )
        }
        sections.push(wrapWithSectionTable(rows));
    }
    if (!!props.mobile) {
        let rows = [];
        for (let item of props.mobile) {
            rows.push(
                <tr>
                    <td className="left">{item.name}</td>
                    <td className="right">
                        <strong>
                            <PhoneAndroid fontSize="small" className="text-icon" />
                            {getPhoneNumberString(item.number)}
                        </strong></td>
                </tr>
            )
        }
        sections.push(wrapWithSectionTable(rows));
    }
    if (!!props.email) {
        let rows = [];
        for (let item of props.email) {
            rows.push(
                <tr>
                    <td className="left">{item.name}</td>
                    <td className="right">
                        <strong><EmailOutlined fontSize="small" className="text-icon" />&nbsp;{item.email}</strong>
                    </td>
                </tr>
            )
        }
        sections.push(wrapWithSectionTable(rows));
    }
    if (!!props.place) {
        sections.push(
            <div className="contact-info-section">

                <LocationOn fontSize="small" className="text-icon" />&nbsp;{props.place}

            </div>
        );
    }
    if (!!props.facebook) {
        sections.push(
            <div className="contact-info-section">
                <a href={props.facebook} target="_blank">
                    <Facebook fontSize="small" className="text-icon" />&nbsp;Facebook
                </a>
            </div>
        );
    }
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