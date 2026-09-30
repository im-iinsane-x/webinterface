import React from "react";
import "./Footer.css";
function Footer() {
const year = new Date().getFullYear();
return (
<footer className="app-footer">
<p>&copy; {year} Student Dashboard | All Rights Reserved</p>
</footer>
);
}
export default Footer;