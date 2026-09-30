import React from "react";
import "./header.css";

function Header() {
	return (
		<header className="hobbiesheader">
			<p className="hobbies-eyebrow">A few things I love doing</p>
			<h1 className="hobbies-title">Hobbies</h1>
			<p className="hobbies-subtitle">
				The things that keep me curious, calm, and recharged outside of work.
			</p>
		</header>
	);
}

export default Header;