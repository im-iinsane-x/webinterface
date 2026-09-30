import React from "react";
import Header from "./components/Header";
import FeaturedHobby from "./components/FeaturedHobby";
import HobbyGrid from "./components/HobbyGrid";
import Footer from "./components/Footer";
import hobbies from "./data/hobbies";
import "./App.css";

function App() {
	const featured = hobbies.find((hobby) => hobby.featured);
	const rest = hobbies.filter((hobby) => !hobby.featured);

	return (
		<div className="App">
			<Header />
			<main className="hobbies-main">
				<FeaturedHobby hobby={featured} />
				<HobbyGrid hobbies={rest} />
			</main>
			<Footer />
		</div>
	);
}

export default App;