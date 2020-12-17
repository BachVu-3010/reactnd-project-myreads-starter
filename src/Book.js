import React, { Component } from "react";
import "./App.css";
import * as BooksAPI from "./BooksAPI";

class Book extends Component {
  state = {
    shelf: this.props.book.shelf,
  };

  changeShelf(book, shelfString) {
    BooksAPI.update(book, shelfString).then((books) => {
      this.setState(() => ({
        shelf: shelfString,
      }));

      if (this.props.triggerReset === true) this.props.autoReset();
    });
  }

  render() {
    const book = this.props.book;
    const { title, authors } = this.props.book;

    let thumbnail = "";

    if (this.props.book.imageLinks !== undefined)
      thumbnail = this.props.book.imageLinks.thumbnail;

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 188,
                backgroundImage: `url(${thumbnail})`,
              }}
            />
            <div className="book-shelf-changer">
              <select
                value={this.props.book.shelf}
                onChange={(e) => this.changeShelf(book, e.target.value)}
              >
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title"> {title} </div>
          <div className="book-authors">
            {" "}
            {authors !== undefined ? authors.join(", ") : authors}
          </div>
        </div>
      </li>
    );
  }
}

export default Book;
