import React from "react";

function Users(props) {
    return (
        <ul>
            {props.users.map(user => {
                return <li key={user.id}>{user.username}</li>
            })}
        </ul>
    )
}

export default Users;