import React from "react";
import Header from "./components/Header";
import StudentCard from "./components/StudentCard";
import SubjectList from "./components/SubjectList";
import Footer from "./components/Footer";
import "./App.css";
function App() {
// Task 4: Subjects array
const subjects = ["React", "Java", "Python", "SQL", "DBMS"];
const semester = "V";
const year = "III";
return (
<div className="App">
<Header collegeName="ABC College of Engineering" />
<main className="dashboard-main">
<StudentCard
name="Rohan S"
registerNo="142"
department="AIDS"
year="III"
cgpa={8.7}
attendance={88}
photo="https://i.pravatar.cc/150?img=13"
/>
<SubjectList subjects={subjects} semester={semester} year={year} />
</main>
<Footer />
</div>
);
}
export default App;
