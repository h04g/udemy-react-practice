
import { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';


const MOdalAddNew = ( props ) => {
    const {show, handleClose} = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");
    const handleSaveUser = () => {

    }

  return (
    
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
                <form>
                    <div className="form-group">
                        <label >Name</label>
                        <input 
                            type="text" 
                            className="form-control"  
                            placeholder="Enter Name" 
                            value={name}
                            onChange={(event)=> setName(event.target.value)}/>
                        

                    </div>
                    <div className="form-group">
                        <label>Job</label>
                        <input 
                            type="text" 
                            className="form-control"  
                            placeholder="Enter Job"
                            value={job}
                            onChange={(event) => setJob(event.target.value)}/>
                    </div>
                </form>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
   
  );
}

export default MOdalAddNew;