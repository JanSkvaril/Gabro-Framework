import './Navbar.scss';
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import { IconButton, List, ListItem, ListItemText } from '@material-ui/core';
import { Menu } from '@material-ui/icons';


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
                            {menuButtons}
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
                        <List>
                            {listButtons}
                        </List>
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

    trans?: boolean,
    color?: string,
    txtColor?: string,
    menu: any,
    version: "v1" | "v2",
    title: string,
    bgFilter: string,
}

interface State {
    drawlerOpenned: boolean,
    navbarHidden: boolean,
    transparent: boolean,
    galleryOpen: boolean
}

export default Navbar;