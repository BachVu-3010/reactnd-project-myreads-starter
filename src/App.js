import React, { Component } from "react";
// import * as BooksAPI from './BooksAPI'
import "./App.css";
import Home from "./Home.js";
import Search from "./Search.js";
// import BookPage from "./BookPage.js";
import { Route } from "react-router-dom";

class BooksApp extends Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        {/* <Route exact path="/book/:id" component={BookPage} /> */}
      </div>
    );
  }
}

export default BooksApp;
