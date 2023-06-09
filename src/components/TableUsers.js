import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchAllUser } from '../services/userServices';
import ModalAddNew from './ModalAddNew';

import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import ModalEditUser from './ModalEditUser';

const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [ dataUserEdit, setDataUserEdit] = useState({})

    const handleClose = () => {
      setIsShowModalAddNew(false);
      setIsShowModalEditUser(false)
    }

    const handleUpdateTable = (user) => {
      setListUsers ([user, ...listUsers])
    }
    useEffect( () => {
        //call APIs
        getUsers(1);
        
    }, [])
    




    const getUsers = async(page) => {
        let res = await fetchAllUser(page);

        if( res && res.data){
          console.log(res)
          setTotalUsers(res.total)
            setListUsers(res.data);
            setTotalPages(res.total_pages);
        }
        
    }

    const handlePageClick = (event) => {
      console.log("event lib:", event)
      getUsers(+event.selected + 1)

    }

    const handleEditUSer = (user) => {
      setDataUserEdit(user)
      setIsShowModalEditUser(true);


    }
    return (<>
    <div className='my-3 add-new'>
              <span>List Users:</span>
              <button className='btn btn-success'
              onClick={()=> setIsShowModalAddNew(true)}
              >Add new User</button>
            </div>

    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Actions</th>

          
        </tr>
      </thead>
      <tbody>
        {
            listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                    return (
                        <tr key ={`users-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td>
                              <button 
                                className='btn btn-warning mx-3'
                                onClick={()=> handleEditUSer(item)} >Edit</button>
                              <button className='btn btn-danger'>Delete</button>
                            </td>
        </tr>
                    )
            })
        }
        
      </tbody>
    </Table>
    <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={totalPages}
        previousLabel="< previous"

        pageClassName='page-item'
        pageLinkClassName='page-link'
        previousClassName='page-item'
        previousLinkClassName='page-link'
        nextClassName='page-item'
        nextLinkClassName='page-link'
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='pagination'
        activeClassName='active'
        
      />

        <ModalAddNew
          
          show = {isShowModalAddNew}
          handleClose = {handleClose}
          handleUpdateTable = {handleUpdateTable}
       
          />
          <ModalEditUser
          
          show={isShowModalEditUser}
          dataUserEdit={dataUserEdit}
          handleClose = {handleClose}
          />
  
    </>)

}

export default TableUsers;