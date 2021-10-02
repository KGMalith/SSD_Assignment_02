import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import { isLogin, logout } from '../services/util/auth';

const PublicRoutes = ({ component: Component, restricted, ...rest }) => {
    return (

        <Route {...rest} render={props => (
            isLogin() ? (logout(), <Redirect to="/" />)
                : <Component {...props} />
        )} />

    );
};

export default PublicRoutes;