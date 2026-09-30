import React from "react";
import "./hobbies.css";

function HobbyBadge({ icon, gradient, size = "normal" }) {
	const style = {
		"--grad-start": gradient[0],
		"--grad-end": gradient[1],
	};

	return (
		<div className={`hobby-badge hobby-badge--${size}`} style={style}>
			<div className="hobby-badge__glow" />
			<div className="hobby-badge__ring" />
			<div className="hobby-badge__core">
				<span className="hobby-badge__icon">{icon}</span>
			</div>
		</div>
	);
}

export default HobbyBadge;