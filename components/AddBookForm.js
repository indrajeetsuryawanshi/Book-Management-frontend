import React, { useState } from 'react';
import axios from 'axios';
import './AddBookForm.css'; 

const AddBookForm = ({ submitHandler, book }) => {
  const initialFormData = {
    title: '',
    author: '',
    genre: ''
  };

  const [formData, setFormData] = useState(book ? {
    title: book.title || '',
    author: book.author || '',
    genre: book.genre || ''
  } : initialFormData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (book) {
        await axios.put(`http://localhost:3001/api/books/${book._id}`, formData);
        alert('Book updated successfully!');
      } else {
        await axios.post('http://localhost:3001/api/books', formData);
        alert('Book added successfully!');
      }
      submitHandler(false);
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="add-book-form-container">
      <h2>{book ? 'Update Book' : 'Add New Book'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
        <button type="submit">{book ? 'Update Book' : 'Add Book'}</button>
      </form>
    </div>
  );
};

export default AddBookForm;
