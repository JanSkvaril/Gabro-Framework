import React, { Component } from 'react';
import './IconList.scss';
import ExpantionPanel from './ExpantionPanel.jsx';

/**
 * List of icons with heading and text.
 * 
 * On destop resolution:
 * one item looks like this: **Heading | Icon | Text** 
 * 
 * On mobile resoultion:
 * Only **Heading** and **Icon** will be displayed. User can click on the item to expand it
 * and display **Text**.
 * 
 * **Example:**
 *  ```jsx
 * import {IconListItem, IconList } from "gabro-framework"
 * ...
 *<IconList data={[
 *   new IconListItem(   //first item
 *   "Some Headline",
 *   require("./path/to/icon.svg"),
 *       "More infromation about the topic")
 *   ,
 *   new IconListItem(   //second item   
 *       "Some Headline",
 *       require("./path/to/icon.svg"),
 *       "More infromation about the topic")
 *   ],
 *   } />
  *  ```
 */
class IconList extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            small: true,
        }
        window.onresize = this.CheckSize.bind(this);
    }
    /** Called on resize, changes mode */
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
        // === desktop mode ====
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
        // === Mobile Mode ===
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
    /** Array of IconListItem objects. Check example for more information */
    data: IconListItem[],

}
interface State {
    /** Will display textr in expantion panel if true */
    small: boolean
}

/** One item of icon list. Must constain **headline**, **icon** path and **text***/
export class IconListItem {
    heading: string;
    icon: string;
    text: JSX.Element | string;
    /**
     * 
     * @param heading Will allways be displayd nexto to icon. Short sentence
     * @param icon Path (url or require("..."))to icon
     * @param text More text about the topic. Can be text, or jsx element (for styling)
     * **Example:**
     * 
     * ```jsx
     * new IconListItem(
        "Some Headline",
        require("./path/to/icon.svg"),
        <React.Fragment>Same text, <b>same bold text</b></React.Fragment>)
     *  ```
     * 
     */
    constructor(heading: string, icon: string, text: JSX.Element | string) {
        this.heading = heading;
        this.icon = icon;
        this.text = text;
    }
}

export default IconList;