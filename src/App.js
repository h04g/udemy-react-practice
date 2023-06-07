
import './App.scss';
import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import { Row } from 'react-bootstrap';

function App() {
  return (
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
  );
}

export default App;
