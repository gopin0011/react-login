import React from "react";
import { Redirect, Route } from "react-router-dom";
import User from "./../../auth/user";

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest}
            render={
                (props) => {
                    if (User.isLoggedIn()) {
                        return <Component {...props} {...rest} />
                    }
                    return <Redirect to={{
                        pathname: "/app/login",
                        state: { from: props.location }
                    }} />
                }
            }
        />
    )
}

export default ProtectedRoute;