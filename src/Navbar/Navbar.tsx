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
 * @version   2.4.3
 *
 * **Example**
 * ```jsx
 *   import { Navbar, NavbarTab } from 'gabro-framework';
 * 
 *  <Navbar bg="#4d2def" color="white" trans>
        *       <NavbarTab type="brand" link="#">BRAND</NavbarTab>
        *       <NavbarTab type="tab" link="#about">ABOUT</NavbarTab>
        *       <NavbarTab type="tab" link="#help">HELP</NavbarTab>
        *       <NavbarTab type="tab" link="#foo">FOO</NavbarTab>
    </Navbar>
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
            // Navbar will slide up 
            top: this.state.navbarHidden ? "-70px" : "0px",
            backdropFilter: !!this.props.bgFilter ? this.props.bgFilter : "",
            background: this.state.transparent ? "rgba(0,0,0,0)" : this.props.bg
        }

        // Object with children components
        let content: any = {
            brand: [],
            tab: []
        };

        if ( !! this.props.children ) {
            // Filling the content object
            for (let i = 0; i < this.props.children?.length; i++) {
                let component = this.props.children[i];

                if (component.props.type === "brand") {
                    content.brand.push(component);
                }
                else if (component.props.type === "tab") {
                    content.tab.push(component);

                }
            }
        }

        return (
            <div className="navbar" style={styles}>
                <div className="container">
                    <Menu style={{ color: !!this.props.color ? this.props.color : "black" }} className="menu-icon desktop-hidden" onClick={this.ToggleDrawer.bind(this)} />

                    {content.brand.Length != 0 ? <span className="brand-wrapper" style={{ color: !!this.props.color ? this.props.color : "black" }}>{content.brand}</span> : ""}
                    {content.tab.Length != 0 ? <span className="tab-wrapper mobile-hidden" style={{ color: !!this.props.color ? this.props.color : "black" }}>{content.tab}</span> : ""}
                </div>

                <Drawer
                    anchor="top"
                    open={this.state.drawerOpenned}
                    onClose={this.ToggleDrawer.bind(this)}>

                    <div className="drawer-bg"
                        style={{
                            background: this.props.bg,
                            color: this.props.color,
                        }}
                    >

                        {content.brand.Length != 0 ? <span onClick={this.ToggleDrawer.bind(this)} className="brand-wrapper-mobile">{content.brand}</span> : ""}

                        {content.tab.Length != 0 ? <span onClick={this.ToggleDrawer.bind(this)} className="tab-wrapper-mobile">{content.tab}</span> : ""}

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
    /** If should be transparent when user scrolls to top of your website. */
    trans?: boolean,

    /** Text color of the navbar. */
    color?: color,

    /** Background of the navbar. */
    bg?: bg,

    /** Bgfilter propperty, e.g blue(5px) - will be only visible, when **bg** is partially transparent (e.g. rgba(250,250,250,0.5)) */
    bgFilter?: string,

    /** Your conent */
    children?: Array<JSX.Element>,
}

interface State {
    drawerOpenned: boolean,
    navbarHidden: boolean,
    transparent: boolean,
    galleryOpen: boolean
}


export function NavbarTab(props: NavbarTabProps) {
    return (
        <a className="navbar-tab-component" href={!!props.link ? props.link : "#"} style={{ textDecoration: "none" }}>
            <span className={`navbar-${props.type}`}>{props.children}</span>
        </a>
    )
}

interface NavbarTabProps {
    /**
    * **Can be in:** Navbar
    */
    /** Type of the tab. 
     * 
     * * `tab` - casual tab
     * * `brand` - place for your brand name or logo.
     */
    type: "brand" | "tab",

    /** Your content (name of the tab) */
    children: string,

    /** Link for the tab */
    link: string
}

export default Navbar;