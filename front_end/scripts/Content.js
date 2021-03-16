import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Error from "./Error";
import Nav from "./Nav";
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

export class Content extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <div className="main">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/signup" component={SignupForm} />
            <Route path="/login" component={LoginForm} />
            <Route component={Error} />
          </Switch>
        </div>
      </>
    );
  }
}
