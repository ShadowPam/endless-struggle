import React from "react";
import ReactDOM from "react-dom/client";
import { Game } from "./presenters/GamePresenter";
import { MainMenu } from "./presenters/MainMenuPresenter.jsx";
import { RouterProvider, createHashRouter } from "react-router-dom";

function makeRouter() {
  return createHashRouter([
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
      element: <Game />,
    },
    /*  {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/leaderboard",
      element: <LeaderBoard />,
    },
    {
      path: "/login",
      element: <Login />,
    }, */
  ]);
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={makeRouter()} />
  </React.StrictMode>
);
