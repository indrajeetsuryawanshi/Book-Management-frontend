import Modal from 'react-bootstrap/Modal';
import AddBookForm from './AddBookForm';

function BookModal({showModal, setShowModal,book}) {
  return (
    <>

      <Modal show={showModal} onHide={setShowModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AddBookForm book={book} submitHandler={setShowModal} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BookModal;