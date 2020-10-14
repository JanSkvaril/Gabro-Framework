/**
 *   This file is soon to be reworked!!
 */

import './Navbar.scss';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { color, bg } from '../Types';

/**
 * @brief Navbar component, used for typical navigation on your website
 * @version   2.3.0
 *
 * **Example**
 * ```jsx
 *   <Navbar
 *       version="v1"
 *       color="#ff12aa"
 *       txtColor="black"
 *       trans={true}
 *       title="Your tittle"
 *       menu={
 *       [
 *           { text: "About us", link: "#about_us" },
 *           { text: "Services", link: "#services" },
 *           { text: "Contact", link: "#contact" }
 *       ]
 *       } />
 *   ```
 */
class Navbar extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            drawlerOpenned: false,
            navbarHidden: false,
            transparent: props.trans == undefined ? false : props.trans,
            galleryOpen: false
        }
        if (props.version == "v1" || !!props.version)
            this.InitScrolling();
    }

    //hiding when scrolling up
    //if trans true makes navbar transparent when at start
    InitScrolling() {
        let prevScrollpos = window.pageYOffset;
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) == false) {
            if (this.props.trans)
                this.setState({ transparent: true });

            window.onscroll = () => {
                let currentScrollPos = window.pageYOffset;

                //transparent navbar when on top
                if (this.props.trans) {
                    if (window.pageYOffset < 100) {
                        if (this.state.transparent != true) {
                            this.setState({
                                transparent: true
                            })
                        }
                    }
                    else {
                        if (this.state.transparent != false && this.state.navbarHidden == false) {
                            this.setState({
                                transparent: false
                            })
                        }
                    }
                }

                //hide navbar when scrolling down
                if (prevScrollpos > currentScrollPos) {
                    if (this.state.navbarHidden != false) {
                        this.setState({
                            navbarHidden: false
                        })
                    }
                } else {
                    if (this.state.navbarHidden != true) {
                        this.setState({
                            navbarHidden: true
                        })
                    }
                }
                prevScrollpos = currentScrollPos;
            };
        }
    }

    ToggleDrawler() {
        this.setState({
            drawlerOpenned: !this.state.drawlerOpenned,
        })
    }


    render() {
        let styles = {
            top: this.state.navbarHidden ? "-70px" : "0px",
            background: this.props.color,
            color: this.props.txtColor,
            backdropFilter: !!this.props.bgFilter ? this.props.bgFilter : "",
        }
        if (this.state.transparent) styles.background = "transparent";

        let menuButtons = [];
        let listButtons = [];
        for (let menuItem of this.props.menu) {
            menuButtons.push(
                <Button color="inherit" href={menuItem.link}>{menuItem.text}</Button>
            )
            listButtons.push(
                <ListItem button component="a" href={menuItem.link} onClick={this.ToggleDrawler.bind(this)}>
                    <ListItemText>
                        {menuItem.text}
                    </ListItemText>
                </ListItem>
            )
        }
        let navbar_ver = "v1";
        if (!!this.props.version) {
            if (this.props.version == "v2") {
                navbar_ver = "v2"
            }
        }

        return (

            <div
                className={"navbar " + navbar_ver}
                id="navbar"
                style={styles}>
                <div className="container">

                    <span className="heading">

                        <a href="#landing-page"
                            style={{ color: this.props.txtColor }}>
                            {this.props.title}
                        </a>

                    </span>
                    <span className="navigation">
                        <span className="menuButtons">
                            {this.props.children}
                        </span>
                        <span className="menuButton">
                            <IconButton onClick={this.ToggleDrawler.bind(this)} color="inherit">
                                <Menu />
                            </IconButton>
                        </span>
                    </span>
                </div>
                <Drawer
                    anchor="top"
                    open={this.state.drawlerOpenned}
                    onClose={this.ToggleDrawler.bind(this)}

                >
                    <div className="drawerBg"
                        style={{
                            background: this.props.color,
                            color: this.props.txtColor,
                        }}>

                        {this.props.children}

                    </div>
                </Drawer>
            </div>

        );
    }
}

interface Props {
    /**
   * **Can be in:** root
   */
    /** If should be transparent when user scrolls to top of your website */
    trans?: boolean,
    /** Background color of the navbar */
    color?: bg,
    /** Text color of the navbar */
    txtColor?: color,
    /**
    * Array of objects, containing text - text displayed and link - anchor where should website scroll to on click
    * 
    * **Example:**
    * ```jsx
    * menu={
    *       [
    *           { text: "About us", link: "#about_us" },
    *           { text: "Services", link: "#services" },
    *           { text: "Contact", link: "#contact" }
    *       ]
    *  ```
     */
    menu: { text: string, link: string }[],
    /** Version of your navbar. TODO: add more documentation */
    version: "v1" | "v2",
    /** Tittle of your website (e.g. name of your company) */
    title: string,
    /** Bgfilter propperty, e.g blue(5px) - will be only visible, when **color** is partially transparent (e.g. rgba(250,250,250,0.5)) */
    bgFilter: string,

    children?: any,
}

interface State {
    drawlerOpenned: boolean,
    navbarHidden: boolean,
    transparent: boolean,
    galleryOpen: boolean
}

export function NavbarLink(props: NavbarLinkProps) {
    return (
        <a className="navbar-link" href={props.link}>
            <div>
                {props.text}
            </div>
        </a>
    )
}
interface NavbarLinkProps {
    /**
    * **Can be in:** Navbar
    */
    /** Displayed text */
    text: string,
    /** Anchor to element on your website */
    link: string,
}

export default Navbar;