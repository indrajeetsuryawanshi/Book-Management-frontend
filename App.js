
import './App.scss';
import BooksList from './components/BookList';
import Button from 'react-bootstrap/esm/Button';
import { useState } from 'react';
import BookModal from './components/BookModal';



function App() {
  const [show, setShow] = useState(false);

  const handleCreateBook = () => {
    setShow(false)
  }
  return (
    <div className="App">
    <h1>Book Management App</h1>
    <BookModal showModal={show} setShowModal={handleCreateBook} />
    <div className='create-btn'>
    <Button variant="primary" onClick={() => setShow(true)}>
        Create Book
      </Button>
    </div>
    <BooksList reloadList={!show} />

    </div>
  );
}

export default App;
