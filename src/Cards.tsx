import React from "react";
import UserCard from "./components/user-card/UserCard";

const users: [] = [];

function Cards() {
    return (
        <div className="uber-container">
            {
                users.map(user => (
                    <UserCard userData={user} />
                ))
            }
        </div>
    )
}

export default Cards;