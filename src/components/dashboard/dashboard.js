import React from "react";
import User from "./../../auth/user";

function Dashboard() {
    const Users = JSON.parse(User.user);

    return (
        <React.Fragment>
            Hello {Users.fullname}, you're logged in!
        </React.Fragment>
    )
}

export default Dashboard