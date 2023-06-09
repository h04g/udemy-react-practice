
import { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import { postCreateUser, putUpdateUser } from '../services/userServices';
import { ToastContainer, toast } from 'react-toastify';

import { useEffect } from 'react';

const ModalEditUser = ( props ) => {
    const {show, handleClose, dataUserEdit, handleEditUserFromModal} = props;
    const [name, setName] = useState("");
    const [job, setJob] = useState("");

    const handleEditUSer = async () => {
      let res = await putUpdateUser(name, job);
      if(res && res.updatedAt){
        //success
        handleEditUserFromModal({
          first_name: name,
          id: dataUserEdit.id
        })

        handleClose();
        toast.success("Updated");
      }

    }
    useEffect(() => {
        if(show){
            setName(dataUserEdit.first_name)
        }
    }, [dataUserEdit])
   

  return (
    
      <Modal show={show} onHide={handleClose}
      backdrop="static"
      keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
          <Button variant="primary" onClick={handleEditUSer}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
   
  );
}

export default ModalEditUser;