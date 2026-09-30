import React from "react";
import HobbyBadge from "./HobbyBadge";
import "./featuredhobby.css";

function FeaturedHobby({ hobby }) {
	return (
		<div className="featured-hobby">
			<div className="featured-hobby__visual">
				<HobbyBadge
					icon={hobby.icon}
					gradient={hobby.gradient}
					size="featured"
				/>
			</div>
			<div className="featured-hobby__content">
				<h2 className="featured-hobby__title">
					<span className="featured-hobby__icon">{hobby.icon}</span>
					{hobby.title}
				</h2>
				<p className="featured-hobby__description">{hobby.description}</p>
				{hobby.whyILikeIt && (
					<div className="featured-hobby__why">
						<p className="featured-hobby__why-label">Why I Like It:</p>
						<ul className="featured-hobby__why-list">
							{hobby.whyILikeIt.map((reason, index) => (
								<li key={index}>{reason}</li>
							))}
						</ul>
					</div>
				)}
			</div>
		</div>
	);
}

export default FeaturedHobby;