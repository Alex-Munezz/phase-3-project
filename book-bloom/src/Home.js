import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [expandedCards, setExpandedCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBook, setSelectedBook] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

  const handleBuyBook = (bookId) => {
    const selectedBook = books.find((book) => book.id === bookId);
    setSelectedBook(selectedBook);
    setShowPaymentModal(true);
  };

  const handlePayment = (paymentMethod) => {
    // Perform payment processing logic here
    console.log("Payment method:", paymentMethod);

    // Update the book's quantity and make API call to update the backend
    const updatedBooks = books.map((book) => {
      if (book.id === selectedBook.id) {
        const updatedQuantity = book.quantity - 1;
        return {
          ...book,
          quantity: updatedQuantity,
        };
      }
      return book;
    });
    setBooks(updatedBooks);

    // Make API call to update the book's quantity in the backend
    fetch(`http://127.0.0.1:8000/books/${selectedBook.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: updatedBooks.find((book) => book.id === selectedBook.id)?.quantity }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          console.log("Book quantity updated successfully in the backend.");
        } else {
          console.error(data.error);
        }
      })
      .catch((error) => {
        console.error("Error updating book quantity in the backend:", error);
      });

    // Close the payment modal
    setShowPaymentModal(false);
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="row">
      <fieldset>
        <h1>Welcome to Book Bloom.</h1>
        <p>Embrace the Magic of Books: Explore, Engage, and Enrich Your Mind!</p>
        <div>
          <input type="text" placeholder="Search Books" value={searchQuery} onChange={handleSearch} />
        </div>
        <div className="book-list">
          {filteredBooks.map((book) => (
            <div className={`card ${isCardExpanded(book.id) ? "expanded" : ""}`} key={book.id}>
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
                  : `${book.description.slice(0, 70)}...`}
              </p>
              <button onClick={() => toggleCardExpansion(book.id)}>
                {isCardExpanded(book.id) ? "View Less" : "View More"}
              </button>
              <button onClick={() => handleBuyBook(book.id)}>Buy Book</button>
            </div>
          ))}
        </div>
        {showPaymentModal && (
          <div className="payment-modal">
            <div className="payment-modal-content">
              <h3>Payment Options</h3>
              <p>Select your payment method:</p>
              <button onClick={() => handlePayment("M-Pesa")}>M-Pesa</button>
              <button onClick={() => handlePayment("Credit Card")}>Credit Card</button>
            </div>
          </div>
        )}
        <br />
        <br />
        <NavLink to="/LoginAdmin">Go to Admin</NavLink>
      </fieldset>
    </div>
  );
}

export default Home;
