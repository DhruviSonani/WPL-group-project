import React, { Component } from 'react'
import { Dashboard, Login, Register } from './Redux/container'
import { BrowserRouter as Router, useRoutes, Route, Link } from 'react-router-dom';
import "./CSS/index.scss";

const Routes = () => {
    let routes = useRoutes([
        { path: '/', element: < Login /> },
        { path: '/register', element: <Register /> },
        { path: '/dashboard', element: < Dashboard /> }
    ]);
    return routes;
}

class App extends Component {
    render() {
        return (
            <Router>
                <Routes />
            </Router>
        )
    }
}


export default App
