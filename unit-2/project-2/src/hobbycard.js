import React from "react";
import HobbyBadge from "./hobbies.js";
import "./hobbycard.css";

function HobbyCard({ hobby }) {
	return (
		<div className="hobby-card">
			<div className="hobby-card__visual">
				<HobbyBadge icon={hobby.icon} gradient={hobby.gradient} />
			</div>
			<div className="hobby-card__content">
				<h3 className="hobby-card__title">
					<span>{hobby.icon}</span>
					{hobby.title}
				</h3>
				<p className="hobby-card__description">{hobby.description}</p>
			</div>
		</div>
	);
}

export default HobbyCard;