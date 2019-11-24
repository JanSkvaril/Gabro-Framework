import React from 'react';
import './Card.scss';

const Card = (props) => {
    return (
        <div className="card">
            <div className="icon-holder">
                <div>
                    <img className="icon" src={props.icon} />
                </div>
                <h2>
                    {props.headline}
                </h2>

            </div>
            <div className="content">{props.children}</div>
        </div>
    );
}


export default Card;