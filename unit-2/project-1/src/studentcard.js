import React from "react";
import "./StudentCard.css";
function StudentCard({
name,
registerNo,
department,
year,
cgpa,
attendance,
photo,
}) {
// Inline style objects (Task 7)
const nameStyle = { color: "blue" };
const cgpaStyle = { color: "green" };
const attendanceStyle = { color: "orange" };
return (
<div className="student-card">
<img className="student-photo" src={photo} alt={name} />
<div className="student-info">
<p>
Name : <span style={nameStyle}>{name}</span>
</p>
<p>Register No : {registerNo}</p>
<p>Department : {department}</p>
<p>Year : {year}</p>
<p>
CGPA : <span style={cgpaStyle}>{cgpa}</span>
</p>
<p>
Attendance : <span style={attendanceStyle}>{attendance}%</span>
</p>
{/* Task 6: Conditional Rendering */}
<p>
Attendance Status :{" "}
{attendance >= 75 ? (
<span className="status eligible">Eligible for Semester Exam</span>
) : (
<span className="status not-eligible">Not Eligible</span>
)}
</p>
<p>
Placement Status :{" "}
{cgpa >= 8 ? (
<span className="status eligible">Eligible</span>
) : (
<span className="status not-eligible">Need Improvement</span>
)}
</p>
</div>
</div>
);
}
export default StudentCard;