import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Content } from "./Content";

ReactDOM.render(
  <BrowserRouter>
    <Content />
  </BrowserRouter>,
  document.getElementById("content")
);
