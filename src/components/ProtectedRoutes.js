import React from "react";
import { connect } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = (props) => {
    let { children, authedUser } = props
    const location = useLocation()
    return (authedUser !== null ? children : <Navigate to="/" state={{ from: location.pathname }}> {alert("please Sign In To continue")} </Navigate>)
}
function mapStateToProps({ authedUser, users }) {

    return ({
        user: users[authedUser],
        authedUser
    })
}
export default connect(mapStateToProps)(ProtectedRoutes)
