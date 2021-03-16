import React from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1 className="title">Hello World</h1>
      <NavLink to="/about">About</NavLink>
    </div>
  );
}
