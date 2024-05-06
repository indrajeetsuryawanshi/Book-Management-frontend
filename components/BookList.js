import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css'; 
import BookModal from './BookModal';

const BooksList = ({ reloadList }) => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (reloadList) {
      fetchBooks();
    }
  }, [reloadList]);

  useEffect(() => {
    const results = books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBooks(results);
  }, [books, searchTerm]);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/books');
      setBooks(response.data.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const deleteHandler = async (book) => {
    try {
      await axios.delete(`http://localhost:3001/api/books/${book._id}`);
      fetchBooks(); 
      alert(`Book with ID ${book._id} deleted successfully!`);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleBookUpdate = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    fetchBooks();
  };
  return (
    <div className="book-list-container">
      <BookModal
        showModal={showModal}
        setShowModal={setShowModal}
        book={selectedBook}
        handleCloseModal={handleCloseModal}
      />

      <h2>Books List</h2>
      <input
        style={{ width: '300px' }}
        type="text"
        placeholder="Search by title, author, or genre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredBooks.map((book) => (
          <li key={book._id} className="book-item">
            <span className="book-details">{book.title}</span> by {book.author} ({book.genre})
            <div className="book-actions">
              <button className="action-button update-button" onClick={() => handleBookUpdate(book)}>Update</button>
              <button className="action-button delete-button" onClick={() => deleteHandler(book)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BooksList;
