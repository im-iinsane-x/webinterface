import React from "react";
import "./Header.css";
function Header({ collegeName }) {
return (
<header className="app-header">
<div className="app-header__badge">SD</div>
<div>
<h1 className="college-name">{collegeName}</h1>
<h2 className="dashboard-title">Student Dashboard</h2>
</div>
</header>
);
}
export default Header;