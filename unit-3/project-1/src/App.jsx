import { useState } from "react";
import "./App.css";

export default function Calculator() {
	const [display, setDisplay] = useState("");

	const handlePress = (value) => {
		if (value === "AC") {
			setDisplay("");
			return;
		}

		if (value === "DEL") {
			setDisplay((previousDisplay) =>
				previousDisplay === "Error" ? "" : previousDisplay.slice(0, -1),
			);
			return;
		}

		if (value === "=") {
			if (!display) return;

			try {
				const expression = display
					.replace(/×/g, "*")
					.replace(/÷/g, "/")
					.replace(/−/g, "-");
				const result = Function(`"use strict"; return (${expression})`)();

				setDisplay(Number.isFinite(result) ? String(result) : "Error");
			} catch {
				setDisplay("Error");
			}
			return;
		}

		setDisplay((previousDisplay) =>
			previousDisplay === "Error" ? value : previousDisplay + value,
		);
	};

	const buttons = [
		["AC", "DEL", "%", "÷"],
		["7", "8", "9", "×"],
		["4", "5", "6", "−"],
		["1", "2", "3", "+"],
		["0", ".", "="],
	];

	const isOperator = (value) => ["÷", "×", "−", "+", "%"].includes(value);

	return (
		<main className="calculator-page">
			<section className="calculator" aria-labelledby="calculator-title">
				<h1 className="calculator__title" id="calculator-title">
					Calculator
				</h1>

				<div className="calculator__display" aria-live="polite">
					<span>{display || "0"}</span>
				</div>

				<div className="calculator__keys">
					{buttons.map((row, rowIndex) => (
						<div className="calculator__row" key={`row-${rowIndex}`}>
							{row.map((button) => {
								const isZero = button === "0";
								const isEquals = button === "=";
								const isFunction =
									button === "AC" ||
									button === "DEL" ||
									button === "%" ||
									isOperator(button);

								return (
									<button
										className={[
											"calculator__key",
											isZero ? "calculator__key--zero" : "",
											isEquals ? "calculator__key--equals" : "",
											isFunction ? "calculator__key--function" : "",
										]
											.filter(Boolean)
											.join(" ")}
										key={button}
										onClick={() => handlePress(button)}
										type="button"
									>
										{button}
									</button>
								);
							})}
						</div>
					))}
				</div>
			</section>
		</main>
	);
}