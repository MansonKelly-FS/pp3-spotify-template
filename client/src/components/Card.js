import React from "react";

const Card = (props) => {
    return (
				<div className="card">
					<div className="cardImg"><img src="https://placehold.co/150x150" alt="alt"/></div>
					<div className="cardDetails">
						<h3>{props.name}</h3>
						<p>metadata</p>
					</div>
				</div>
    )
}

export default Card; 