import React from "react";
import {Link} from "react-router-dom";

function Home() {
    return (
        <ul>
            <li><Link to="/login">Log-In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
        </ul>
    )
}

export default Home;