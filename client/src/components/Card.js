import React from "react";

const Card = (props) => {
    return (
      <div className="card" key={props.key}>
        <div className="cardImg">
          <img src={props.img} alt="alt" />
        </div>
        <div className="cardDetails">
          <h3>
            <a href={props.link}>{props.name}</a>
          </h3>
          <p>{props.metadata}</p>
        </div>
      </div>
    );
}

export default Card; 