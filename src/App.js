
import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import MOdalAddNew from './components/ModalAddNew';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';


function App() {

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false)
  const handleClose = () => {
    setIsShowModalAddNew(false);
  }
  return (
    <div className='app-container'>
      {/* <Container>
        <Row> */}
          <Header/>
          <Container>
            <div className='my-3 add-new'>
              <span>List Users:</span>
              <button className='btn btn-success'
              onClick={()=> setIsShowModalAddNew(true)}
              >Add new User</button>
            </div>
            <TableUsers/>
          </Container>
          <MOdalAddNew
          
          show = {isShowModalAddNew}
          handleClose = {handleClose}
       
          />
        {/* </Row>
      </Container> */}
      
      
    </div>
  );
}

export default App;
