/**
 *  @fileOverview Navbar component
 *
 *  @author       Nikol Škvařilová    <skvarilovanikol@gmail.com>
 */

import './Navbar.scss';
import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';
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
            drawerOpenned: false,
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

    ToggleDrawer() {
        this.setState({
            drawerOpenned: !this.state.drawerOpenned,
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

        // Object with children components
        let content : any = {
            brand: [],
            tab: []
        };

        // Filling the content object
        this.props.children.forEach((component) => {

            if (component.props.type === "brand") {
                content.brand.push(component);
            }
            else if (component.props.type === "tab") {
                content.tab.push(component);

            }
        });

        

        return (
            <div className="navbar">
                <div className="container">
                    <Menu className="menu-icon desktop-hidden" onClick={ this.ToggleDrawer.bind(this) }/>
                    
                    { content.brand.Length != 0 ? <span className="brand-wrapper mobile-hidden">{ content.brand }</span> : "" }
                    { content.tab.Length != 0 ? <span className="tab-wrapper mobile-hidden">{ content.tab }</span> : "" }
                </div>

                <Drawer
                    anchor="top"
                    open={this.state.drawerOpenned}
                    onClose={this.ToggleDrawer.bind(this)}>

                    <div className="drawer-bg"
                        style={{
                            background: this.props.color,
                            color: this.props.txtColor,
                        }}>

                        { content.brand.Length != 0 ? <span className="brand-wrapper-mobile">{ content.brand }</span> : "" }

                        { content.tab.Length != 0 ? <span className="tab-wrapper-mobile">{ content.tab }</span> : "" }

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

    children: Array<JSX.Element>,
}

interface State {
    drawerOpenned: boolean,
    navbarHidden: boolean,
    transparent: boolean,
    galleryOpen: boolean
}


export function NavbarTab(props: NavbarTabProps) {
    return (
    <a href={ !! props.link ? props.link : "#" } style={{ textDecoration: "none", color: "black" }}>
        <span className={ `navbar-tab-component navbar-${ props.type }` }>{ props.children }</span>
    </a>
    )
}

interface NavbarTabProps {
    type:       "brand" | "tab",
    children:   string,
    link:       string
}

export default Navbar;