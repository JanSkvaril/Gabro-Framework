import React, { Component } from 'react';
import './IconList.scss';
import ExpantionPanel from './ExpantionPanel.jsx';


class IconList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            small: true,
        }
        window.onresize = this.CheckSize.bind(this);
    }
    CheckSize() {
        if (window.innerWidth < 1200) {
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
                        headline={
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

interface Props {
    data: IconListItem[],

}
interface State {
    small: boolean
}

export class IconListItem {
    heading: string;
    icon: string;
    text: JSX.Element | string;
    constructor(heading: string, icon: string, text: JSX.Element | string) {
        this.heading = heading;
        this.icon = icon;
        this.text = text;
    }
}

export default IconList;