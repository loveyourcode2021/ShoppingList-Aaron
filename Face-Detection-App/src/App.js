import React, {useState} from "react";

import {loadModels} from "./helpers/faceApi";
import {createFaLibrary} from "./helpers/icons";
import Camera from "./components/Camera/Camera";

import "./App.css";
createFaLibrary();
loadModels();
function App() {

  return (
    <div className="App">
      <Camera />
    </div>
  );
}

export default App;