import React, { Component } from 'react';
import './IconList.scss';
import ExpantionPanel from './ExpantionPanel.js';

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
 *       <IconList>
 *          <IconListItem heading="Headline 1" icon_path={require("./logo.svg")}>
 *            Contrary to popular belief, Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem Ipsum is not simply random text.
 *          </IconListItem>
 *          <IconListItem heading="Headline 2" icon_path={require("./logo.svg")}>
 *            Contrary to popular belief, Lorem Ipsum is not simply random text. Contrary to popular belief, Lorem Ipsum is not simply random text.
 *          </IconListItem>
 *        </IconList>
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
        // if (!this.state.small) {
        //     let tableData = [];
        //     let key = 0;
        //     for (let row of this.props.data) {
        //         tableData.push(
        //             <tr key={key++}>
        //                 <td className="table-heading">{row.heading}</td>
        //                 <td className="table-icon"><img src={row.icon} alt="icon" /></td>
        //                 <td className="table-text">{row.text}</td>
        //             </tr>
        //         )
        //     }
        //     return (
        //         <div className="icon-list">
        //             <table className="table-view">
        //                 <tbody>
        //                     {tableData}
        //                 </tbody>
        //             </table>
        //         </div>
        //     );
        // }
        // === Mobile Mode ===
        return (
            <div className="icon-list">
                <div className="list-view">
                    {this.props.children}
                </div>
            </div>
        );
    }
}


interface Props {
    /**
    * **Can be in:** Half, Full
    */
    /** Array of IconListItem objects. Check example for more information */
    children?: any

}
interface State {
    /** Will display textr in expantion panel if true */
    small: boolean
}

/** One item of icon list. Must constain **heading**, **icon_path** path and **text***/
export function IconListItem(props: IconListItemProps) {

    return (
        <ExpantionPanel
            headline={
                <table>
                    <tbody>
                        <tr>
                            <td className="img-colum"> <img src={props.icon_path} alt="icon" /> </td>
                            <td className="text-colum">    {props.heading}</td>
                        </tr>
                    </tbody>
                </table>
            }
        >
            <p className="list-text">
                {props.children}
            </p>
        </ExpantionPanel>
    )
}
interface IconListItemProps {
    /**
    * **Can be in:** IconList
    */
    /** Path to your icon (can be svg or any image format) */
    icon_path: string,
    /** Simple and short heading */
    heading: string,
    /** Text, can be longer (about 1 - 2 paragrahps) */
    children?: any,
}

export default IconList;