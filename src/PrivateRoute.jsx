import React, {useContext} from "react";
import {Navigate} from "react-router";
import AuthContext from "./context/AuthContext";

const PrivateRoute = ({ children }) => {
    const {authToken} = useContext(AuthContext);

    return authToken ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;