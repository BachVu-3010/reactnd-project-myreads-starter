import React, { Component } from "react";
import "./App.css";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

class Home extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    triggerReset: true,
  };

  autoReset = () => {
    this.getBooks();
  };

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      console.log(books);

      const currentlyReading = books.filter((book) => {
        return book.shelf === "currentlyReading";
      });

      const wantToRead = books.filter((book) => {
        return book.shelf === "wantToRead";
      });

      const read = books.filter((book) => {
        return book.shelf === "read";
      });

      this.setState(() => ({
        currentlyReading: currentlyReading,
        wantToRead: wantToRead,
        read: read,
      }));
    });
  };

  componentDidMount() {
    this.getBooks();
  }
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.currentlyReading.map((book) => (
                    <Book
                      book={book}
                      key={book.id}
                      autoReset={this.autoReset}
                      triggerReset={this.state.triggerReset}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.wantToRead.map((book) => (
                    <Book
                      book={book}
                      key={book.id}
                      autoReset={this.autoReset}
                      triggerReset={this.state.triggerReset}
                    />
                  ))}
                </ol>
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.state.read.map((book) => (
                    <Book
                      book={book}
                      key={book.id}
                      autoReset={this.autoReset}
                      triggerReset={this.state.triggerReset}
                    />
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
          {/* <button onClick={() => this.setState({ showSearchPage: true })}>
            Add a book
          </button> */}
        </div>
      </div>
    );
  }
}

export default Home;
