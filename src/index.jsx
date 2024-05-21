import React from "react";
import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot.jsx";
import { model } from "./GameModel.js";
import { globalModel } from "./GlobalModel.js";
import { observable, configure, reaction } from "mobx";
import "./firebaseModel.js";

configure({ enforceActions: "never" }); // we don't use Mobx actions
const reactiveModel = observable(model);
const reactiveGlobalModel = observable(globalModel);

createRoot(document.getElementById("root")).render(
      <ReactRoot model={reactiveModel} globalModel = {reactiveGlobalModel}/>
);

import { connectToFirebase } from "./firebaseModel.js";

window.myModel= reactiveModel; 

connectToFirebase(reactiveModel, reactiveGlobalModel, reaction);
//connectToFireBaseGlobal(reactiveGlobalModel, reaction);
