# Book-Bloom

The Book-Bloom Application is a web-based application that allows users to manage books, users, purchases, and reviews. It provides a RESTful API built with FastAPI and a SQLite database for data storage. The application supports CRUD operations (Create, Read, Update, Delete) for books, users, purchases, and reviews.
The link to the backend is this :  https://github.com/Alex-Munezz/phase-3-project-backend

## Features

- User Management: Create, retrieve, update, and delete user information.
- Book Management: Add, retrieve, update, and delete book details.
- Purchase Management: Track and manage user purchases.
- Review Management: Allow users to submit and retrieve book reviews.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/book-application.git
   cd book-application
Create a virtual environment and activate it:


Create the database tables:

bash
Copy code
python create_tables.py
Run the application:

bash
Copy code
uvicorn app:app --reload
The API will be available at http://localhost:8000.

API Endpoints
The application provides the following API endpoints:

GET /users: Retrieve all users.

POST /users: Create a new user.

GET /users/{user_id}: Retrieve user details by ID.

PUT /users/{user_id}: Update user details by ID.

DELETE /users/{user_id}: Delete a user by ID.

GET /books: Retrieve all books.

POST /books: Add a new book.

GET /books/{book_id}: Retrieve book details by ID.

PUT /books/{book_id}: Update book details by ID.

DELETE /books/{book_id}: Delete a book by ID.

GET /purchases: Retrieve all purchases.

POST /purchases: Create a new purchase.

GET /purchases/{purchase_id}: Retrieve purchase details by ID.

PUT /purchases/{purchase_id}: Update purchase details by ID.

DELETE /purchases/{purchase_id}: Delete a purchase by ID.

GET /reviews: Retrieve all reviews.

POST /reviews: Create a new review.

GET /reviews/{review_id}: Retrieve review details by ID.

PUT /reviews/{review_id}: Update review details by ID.

DELETE /reviews/{review_id}: Delete a review by ID.

Note: Replace {user_id}, {book_id}, {purchase_id}, and {review_id} with the corresponding resource ID in the API endpoints.

Documentation
The application uses FastAPI's built-in documentation feature. You can access the API documentation by visiting http://localhost:8000/docs in your browser.

Contributing
Contributions are welcome! If you find any issues or want to add new features, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License.

Feel free to customize the content based on your specific application and require