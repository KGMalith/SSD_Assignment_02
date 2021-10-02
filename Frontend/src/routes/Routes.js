import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes.js';
import PublicRoutes from './PublicRoutes.js';
import Home from '../views/Home';
import Main  from '../views/Main';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                    <Switch>
                        {/* Public Routes */}
                        <PublicRoutes exact component={Main} path={`/`} />

                        {/* Private Routes */}
                        <PrivateRoutes component={Home} path={`/home`} />
                    </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;

