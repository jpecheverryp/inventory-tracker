import React from "react";

function Dashboard(props) {
    return (
        <div>
            <h1>Dashboard!!</h1>
            <p>Hello USER: {props.user.username}</p>
            <p>Access Token: {props.accessToken}</p>
        </div>
    )
}

export default Dashboard;