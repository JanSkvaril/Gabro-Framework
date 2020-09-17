import React, { Component } from 'react';
import Collapse from '@material-ui/core/Collapse';
import { IconButton } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

class ExpantionPanel extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            open: false
        }
    }

    HandleClick() {
        this.setState({ open: !this.state.open });
    }
    render() {
        let iconStyles = {
            transform: this.state.open ? "rotateZ(180deg)" : "rotateZ(0deg)",
            transition: "0.2s"

        }
        return (
            <div className="expantion-panel" onClick={this.HandleClick.bind(this)}>
                <div className="head">
                    <table style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td> {this.props.headline}</td>
                                <td style={{ width: "50px", }}>
                                    <IconButton style={iconStyles}>
                                        <ExpandMore />
                                    </IconButton>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Collapse in={this.state.open}>
                    <div className="content">
                        {this.props.children}
                    </div>
                </Collapse>
            </div>
        );
    }
}

interface Props {
    headline: any,
    children: any,
}
interface State {
    open: boolean
}

export default ExpantionPanel;