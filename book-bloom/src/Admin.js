import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./Admin.css";

function Admin() {
  const [books, setBooks] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateForm, setUpdateForm] = useState({
    title: "",
    author: "",
    price: "",
    publisher: "",
    year: "",
    pages: "",
    quantity: "",
    description: ""
  });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/books")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      });
  }, []);

  const toggleCardExpansion = (cardId) => {
    if (expandedCards.includes(cardId)) {
      setExpandedCards(expandedCards.filter((id) => id !== cardId));
    } else {
      setExpandedCards([...expandedCards, cardId]);
    }
  };

  const isCardExpanded = (cardId) => {
    return expandedCards.includes(cardId);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteBook = (booksId) => {
    fetch(`http://127.0.0.1:8000/deletebooks/${booksId}`, {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
    })
      .then((res) => res.json())
      .then((data) => {
        // if (data.success) {
        //  setBooks(books.filter((book) => book.id !== bookId));
        // } else {
        //   console.error(data.error);
        // }
        console.log(data)
      })

    

      .catch((error) => {
        console.error("Error deleting book:", error);
      });
  };
  const {nezzid} = useParams
  const handleDelete = () => {
     handleDeleteBook(nezzid)
  }


  const handleUpdateFormChange = (e) => {
    setUpdateForm({
      ...updateForm,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdateBook = (bookId) => {
    fetch(`http://127.0.0.1:8000/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateForm),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Book updated successfully, update the state
          const updatedBooks = books.map((book) => {
            if (book.id === bookId) {
              return {
                ...book,
                ...updateForm
              };
            }
            return book;
          });
          setBooks(updatedBooks);
          setUpdateForm({
            title: "",
            author: "",
            price: "",
            publisher: "",
            year: "",
            pages: "",
            quantity: "",
            description: ""
          });
        } else {
          // Handle error if book update fails
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error updating book:", error);
      });
  };

  const handleAddBook = () => {
    fetch("http://127.0.0.1:8000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateForm),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Book added successfully, update the state
          setBooks([...books, data.book]);
          setUpdateForm({
            title: "",
            author: "",
            price: "",
            publisher: "",
            year: "",
            pages: "",
            quantity: "",
            description: ""
          });
        } else {
          // Handle error if book addition fails
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error adding book:", error);
      });
  };

  return (
    <div className="row">
      <fieldset>
        <h1>
          <u>Welcome Mr. Munezz.</u>
        </h1>
        <br />
        <input
          type="text"
          placeholder="Search Books"
          value={searchQuery}
          onChange={handleSearch}
        />
        <div className="book-list">
          {filteredBooks.map((book) => (
            <div
              className={`card ${isCardExpanded(book.id) ? "expanded" : ""}`}
              key={book.id}
            >
              <img src={book.cover} alt={book.title} />
              <h2>Title: {book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Price: {book.price}</p>
              <p>Publisher: {book.publisher}</p>
              <p>Release Year: {book.year}</p>
              <p>Pages: {book.pages}</p>
              <p>Remaining copies: {book.quantity}</p>
              <p>
                Description:{" "}
                {isCardExpanded(book.id)
                  ? book.description
                  : `${book.description.slice(0, 100)}...`}
              </p>
              <button onClick={() => toggleCardExpansion(book.id)}>
                {isCardExpanded(book.id) ? "View Less" : "View More"}
              </button>
              <button onClick={ handleDelete}>
                Delete book
              </button>
            </div>
          ))}
        </div>
        <br />
        <div className="update">
          <h2>Update Book</h2>
          <form>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={updateForm.title}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={updateForm.author}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={updateForm.price}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="publisher"
              placeholder="Publisher"
              value={updateForm.publisher}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="year"
              placeholder="Release Year"
              value={updateForm.year}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="pages"
              placeholder="Pages"
              value={updateForm.pages}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={updateForm.quantity}
              onChange={handleUpdateFormChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={updateForm.description}
              onChange={handleUpdateFormChange}
            ></textarea>
            <br />
            <button
              type="button"
              onClick={() => handleUpdateBook(books.id)}
            >
              Update
            </button>
          </form>
        </div>
        <br />
        <div className="add">
          <h2>Add Book</h2>
          <form>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={updateForm.title}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="author"
              placeholder="Author"
              value={updateForm.author}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={updateForm.price}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="publisher"
              placeholder="Publisher"
              value={updateForm.publisher}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="year"
              placeholder="Release Year"
              value={updateForm.year}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="pages"
              placeholder="Pages"
              value={updateForm.pages}
              onChange={handleUpdateFormChange}
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={updateForm.quantity}
              onChange={handleUpdateFormChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={updateForm.description}
              onChange={handleUpdateFormChange}
            ></textarea>
            <br />
            <button type="button" onClick={handleAddBook}>
              Add
            </button>
          </form>
        </div>
        <br />
        <NavLink to="/Home">Go to Home</NavLink>
      </fieldset>
    </div>
  );
}

export default Admin;
