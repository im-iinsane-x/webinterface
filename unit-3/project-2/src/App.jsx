import React, { useState } from "react";

function App() {
	const [students, setStudents] = useState([
		{ name: "Rohan", present: true },
		{ name: "Barath", present: true },
		{ name: "Santhosh", present: true },
		{ name: "Joe", present: false },
		{ name: "Kavya", present: false },
	]);
	const [name, setName] = useState("");

	const total = students.length;
	const presentCount = students.filter((student) => student.present).length;
	const absentCount = total - presentCount;
	const attendance =
		total === 0 ? "0.00" : ((presentCount / total) * 100).toFixed(2);

	const addStudent = () => {
		const studentName = name.trim();

		if (studentName !== "") {
			setStudents([...students, { name: studentName, present: false }]);
			setName("");
		}
	};

	const toggleAttendance = (index) => {
		const updatedStudents = [...students];
		updatedStudents[index].present = !updatedStudents[index].present;
		setStudents(updatedStudents);
	};

	return (
		<div style={styles.body}>
			<div style={styles.wrap}>
				<h1 style={styles.heading}>Attendance Tracker</h1>

				<div style={styles.addRow}>
					<input
						type="text"
						placeholder="Enter student name"
						value={name}
						onChange={(event) => setName(event.target.value)}
						style={styles.input}
					/>
					<button onClick={addStudent} style={styles.addButton} type="button">
						Add Student
					</button>
				</div>

				<div style={styles.stats}>
					<span>Total: {total}</span>
					<span>Present: {presentCount}</span>
					<span>Absent: {absentCount}</span>
					<span>Attendance: {attendance}%</span>
				</div>

				<div>
					{students.map((student, index) => (
						<div style={styles.row} key={student.name}>
							<span style={styles.name}>{student.name}</span>
							<span style={styles.status}>
								Status: {student.present ? "Present" : "Absent"}
							</span>
							<button
								onClick={() => toggleAttendance(index)}
								style={styles.button}
								type="button"
							>
								{student.present ? "Mark Absent" : "Mark Present"}
							</button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

const styles = {
	body: {
		display: "flex",
		justifyContent: "center",
		minHeight: "100vh",
		boxSizing: "border-box",
		margin: 0,
		padding: "40px 16px",
		background: "#eeeeee",
		color: "#222",
		fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
	},
	wrap: {
		width: "100%",
		maxWidth: "760px",
		height: "fit-content",
		margin: "0 auto",
		padding: "32px 24px 24px",
		boxSizing: "border-box",
		borderRadius: "12px",
		background: "#ffffff",
	},
	heading: {
		margin: "8px 0 24px",
		fontSize: "2.6rem",
		fontWeight: 800,
		textAlign: "center",
	},
	addRow: {
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		gap: "10px",
		marginBottom: "20px",
	},
	input: {
		flex: "1 1 220px",
		minWidth: 0,
		padding: "12px 14px",
		boxSizing: "border-box",
		border: "1px solid #ddd",
		borderRadius: "8px",
		fontSize: "1rem",
	},
	addButton: {
		padding: "12px 20px",
		border: "none",
		borderRadius: "8px",
		background: "#2b2b2b",
		color: "#fff",
		fontWeight: 600,
		cursor: "pointer",
		whiteSpace: "nowrap",
	},
	stats: {
		display: "flex",
		flexWrap: "wrap",
		justifyContent: "space-between",
		gap: "12px 20px",
		marginBottom: "20px",
		padding: "18px",
		borderRadius: "8px",
		background: "#eeeeee",
		color: "#555",
		fontSize: "1.05rem",
	},
	row: {
		display: "grid",
		gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr) auto",
		alignItems: "center",
		gap: "12px",
		marginBottom: "14px",
		padding: "16px",
		borderRadius: "8px",
		background: "#f5f5f5",
	},
	name: {
		minWidth: 0,
		color: "#333",
		fontSize: "1.05rem",
		fontWeight: 700,
		overflowWrap: "anywhere",
	},
	status: {
		color: "#666",
		fontSize: "0.95rem",
		textAlign: "center",
	},
	button: {
		padding: "10px 12px",
		border: "none",
		borderRadius: "8px",
		background: "#2b2b2b",
		color: "#fff",
		fontSize: "0.9rem",
		fontWeight: 600,
		cursor: "pointer",
		whiteSpace: "nowrap",
	},
};

export default App;