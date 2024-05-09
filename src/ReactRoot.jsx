import React from "react";
import ReactDOM from "react-dom/client";
import { Game } from "./presenters/GamePresenter";
import { MainMenu } from "./presenters/MainMenuPresenter.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";
import { observer } from "mobx-react-lite";

function makeRouter(props) {
    return createHashRouter([
        {
            path: "/",
            element: <MainMenu model={props.model} />,
        },
        {
            path: "/menu",
            element: <MainMenu model={props.model} />,
        },
        {
            path: "/game",
            element: <Game model={props.model} />,
        },
        /*  {
      path: "/settings",
      element: <Settings model={props.model}/>,
    },
    {
      path: "/leaderboard",
      element: <LeaderBoard model={props.model}/>,
    },
    {
      path: "/login",
      element: <Login model={props.model}/>,
    }, */
    ]);
}

const ReactRoot = observer(function ReactRoot(props) {
    return (
        <React.StrictMode>
            <RouterProvider router={makeRouter(props)} />
        </React.StrictMode>
    );
});

export { ReactRoot };
