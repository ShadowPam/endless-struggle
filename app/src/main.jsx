import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { MainMenu } from "./MainMenuPresenter.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";


function makeRouter() {
    return (
        createHashRouter([
        {
            path: "/",
            element: <MainMenu />,
        },
        {
            path: "/menu",
            element: <MainMenu />,
        },
        {
            path: "/game",
            element: <App />,
        },
        {
            path: "/settings",
            element: <MainMenu />,
        },
        {
            path: "/leaderboard",
            element: <MainMenu />,
        }
        
    ]))
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={makeRouter()}/>
    </React.StrictMode>,
)
