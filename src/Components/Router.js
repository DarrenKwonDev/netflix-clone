import React from "react";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Header from "./Header";
import Home from "../Routes/Home";
import TV from "../Routes/TV";
import Search from "../Routes/Search";
import Detail from "../Routes/Detail";

export default () => (
  <BrowserRouter>
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/tv" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/movie/:id" component={Detail} />
        <Route path="/show/:id" component={Detail} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  </BrowserRouter>
);
