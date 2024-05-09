import React from "react";
import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot.jsx";
import { model } from "./GameModel.js";
import { observable, configure, reaction } from "mobx";

configure({ enforceActions: "never" }); // we don't use Mobx actions
const reactiveModel = observable(model);

createRoot(document.getElementById("root")).render(<ReactRoot model={reactiveModel} />);
