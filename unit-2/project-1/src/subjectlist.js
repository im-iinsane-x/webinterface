import React from "react";
import "./SubjectList.css";
function SubjectList({ subjects, semester, year }) {
return (
<div className="subject-list-card">
<h3>Subjects</h3>
<ul className="subject-ul">
{subjects.map((subject, index) => (
<li key={index}>{subject}</li>
))}
</ul>
{/* Task 5: JSX Expressions */}
<div className="semester-info">
<p>Current Semester : {semester}</p>
<p>Current Year : {year}</p>
<p>Total Subjects : {subjects.length}</p>
</div>
</div>
);
}
export default SubjectList;
src/components/SubjectList