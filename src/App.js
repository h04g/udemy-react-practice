
import './App.scss';
import Header from './components/Header';

import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import { ToastContainer } from 'react-toastify';


function App() {

 
  return (
    <>
    <div className='app-container'>
      {/* <Container>
        <Row> */}
          <Header/>
          <Container>
            
            <TableUsers/>
          </Container>
          
        {/* </Row>
      </Container> */}
      
      
    </div>
    <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </>
  );
}

export default App;
