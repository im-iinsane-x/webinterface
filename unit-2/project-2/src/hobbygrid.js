import React from "react";
import HobbyCard from "./hobbycard.js";
import "./hobbygrid.css";

function HobbyGrid({ hobbies }) {
	return (
		<div className="hobby-grid">
			{hobbies.map((hobby) => (
				<HobbyCard key={hobby.id} hobby={hobby} />
			))}
		</div>
	);
}

export default HobbyGrid;