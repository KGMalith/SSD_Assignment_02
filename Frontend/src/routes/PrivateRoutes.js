import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../services/util/auth';



const PrivateRoutes = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoutes;