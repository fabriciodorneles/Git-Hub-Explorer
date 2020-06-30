import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';

// function App() {
//     return <Routes />;
// }
const App: React.FC = () => (
    <BrowserRouter>
        <Routes />;
    </BrowserRouter>
);

export default App;
