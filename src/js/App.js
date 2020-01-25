import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/shared/Header";
import Footer from "./components/shared/Footer";
import Main from "./components/Main";

require("../sass/style.sass");

function isTouchDevice() {
  return (
    "ontouchstart" in window || navigator.maxTouchPoints // works on most browsers
  ); // works on IE10/11 and Surface
}

const App = () => (
  <BrowserRouter>
    <div>
      <div className="wrapper">
        <Header />
        <div className="pageContent">
          <Main />
        </div>
        <div className="push"> </div>
      </div>
      <Footer />
    </div>
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById("root"));
console.log("Tany4 - Welcome to my page!");
document
  .getElementsByTagName("body")[0]
  .classList.add(isTouchDevice() ? "touch" : "no-touch");
