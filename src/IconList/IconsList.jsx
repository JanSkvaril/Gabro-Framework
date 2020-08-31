import React, { Component } from 'react';
import './IconList.scss';


import ExpantionPanel from '../MyExpantionPanel';
class IconList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            small: true,
        }
        window.onresize = this.CheckSize.bind(this);
    }
    CheckSize() {
        if (window.innerWidth < 1050) {
            if (!this.state.small) {
                this.setState({ small: true })
            }
        }
        else {
            if (this.state.small) {
                this.setState({ small: false })
            }
        }
    }
    componentDidMount() {
        this.CheckSize();
    }

    render() {
        if (!this.state.small) {
            let tableData = [];
            let key = 0;
            for (let row of this.props.data) {
                tableData.push(
                    <tr key={key++}>
                        <td className="table-heading">{row.heading}</td>
                        <td className="table-icon"><img src={row.icon} alt="icon" /></td>
                        <td className="table-text">{row.text}</td>
                    </tr>
                )
            }
            return (
                <div className="icon-list">
                    <table className="table-view">
                        <tbody>
                            {tableData}
                        </tbody>
                    </table>
                </div>
            );
        }
        else {
            let listData = [];
            let key = 0;
            for (let row of this.props.data) {
                listData.push(
                    <ExpantionPanel
                        key={key++}
                        head={
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="img-colum"> <img src={row.icon} alt="icon" /> </td>
                                        <td className="text-colum">    {row.heading}</td>
                                    </tr>
                                </tbody>
                            </table>
                        }
                    >
                        <p className="list-text">
                            {row.text}
                        </p>
                    </ExpantionPanel>
                )
            }
            return (
                <div className="icon-list">
                    <div className="list-view">
                        {listData}
                    </div>
                </div>
            );
        }
    }
}

export class IconListItem {
    constructor(heading, icon, text) {
        this.heading = heading;
        this.icon = icon;
        this.text = text;
    }
}

export default IconList;