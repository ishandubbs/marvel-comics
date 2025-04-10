import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    <main style={{ padding: "1rem "}}>
        <p>There is nothing here!</p>
        <Link style={{ color: "white" }} to="/">
            Back to Home
        </Link>
    </main>
}

export default NotFound