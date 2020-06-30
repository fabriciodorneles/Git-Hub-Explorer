import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

// const Routes: React.FC = () => {
//     return();
// }
const Routes: React.FC = () => (
    // Switch garante que apenas uma rota seja exibida
    // Porque o react-dom executa tudo por default
    <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="/repository" component={Repository} />
    </Switch>
);

export default Routes;
