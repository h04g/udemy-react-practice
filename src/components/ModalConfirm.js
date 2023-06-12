
import {Modal, Button} from 'react-bootstrap';


const ModalConfirm = ( props ) => {
    const {show, handleClose, dataUserDelete} = props;
    
    const confirmDelete = () => {

    }

  return (
    
      <Modal 
        show={show} 
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                This  action can't be done! 
                Do you want to delete this user?
                <br/>
                <b>Email = "{dataUserDelete.email}"</b>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
   
  );
}

export default ModalConfirm;