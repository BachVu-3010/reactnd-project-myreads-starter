import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

import Book from "./Book";

class BookPage extends Component {
  state = {
    book: null,
    showLoading: "none",
  };

  componentDidMount() {
    BooksAPI.get(this.props.match.params.id).then((resp) => {
      this.setState({ book: resp });
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((resp) => {
      book.shelf = shelf;
      this.setState({ book });
    });
  };

  render() {
    let { book } = this.state;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Book</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.book && (
                    <Book
                      book={book}
                      shelf={book.shelf}
                      key={book.id}
                      id={book.id}
                      imgurl={book.imageLinks.thumbnail}
                      title={book.title}
                      author={book.authors}
                      resetMain={this.resetMain}
                    />
                  )}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Link to="/">Home</Link> | <Link to="/search">Search</Link>
        </div>
      </div>
    );
  }
}

export default BookPage;
