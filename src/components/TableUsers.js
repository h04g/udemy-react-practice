import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';

import { fetchAllUser } from '../services/userServices';
import ModalAddNew from './ModalAddNew';
import ModalConfirm from './ModalConfirm';


import ReactPaginate from 'react-paginate';
import ModalEditUser from './ModalEditUser';
import _, { clone, debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv"
import Papa from "papaparse"
import { toast } from 'react-toastify'
import './TableUser.scss'

const TableUsers = (props) => {

    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    
    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);

    const [ dataUserEdit, setDataUserEdit] = useState({})
    const [ dataUserDelete, setDataUserDelete] = useState({})


    const [ sortBy, setSortBy ] = useState("asc");
    const [ sortField, setSortField ] = useState ("id")
    const [ keyword, setKeyword] = useState("")

    const [ dataExport, setDataExport ] = useState([]) 

    const handleClose = () => {
      setIsShowModalAddNew(false);
      setIsShowModalEditUser(false);
      setIsShowModalDelete(false)
    }

    const handleUpdateTable = (user) => {
      setListUsers ([user, ...listUsers])
    }

    const handleEditUserFromModal = (user) => {
      let cloneListUsers = _.cloneDeep(listUsers)
      let index = listUsers.findIndex(item => item.id === user.id);
      cloneListUsers[index].first_name = user.first_name;
      setListUsers(cloneListUsers);
    }




    useEffect( () => {
        //call APIs
        getUsers(1);
        
    }, [])
    




    const getUsers = async(page) => {
        let res = await fetchAllUser(page);

        if( res && res.data){
          
          setTotalUsers(res.total)
            setListUsers(res.data);
            setTotalPages(res.total_pages);
        }
        
    }

    const handlePageClick = (event) => {
      
      getUsers(+event.selected + 1)

    }

    const handleEditUSer = (user) => {
      setDataUserEdit(user)
      setIsShowModalEditUser(true);


    }
    const handleDeleteUser = (user) => {
      setIsShowModalDelete(true);
      setDataUserDelete(user)
    }

    const handleDeleteUserFromModal = (user) => {
      let cloneListUsers = _.cloneDeep(listUsers)
      cloneListUsers = cloneListUsers.filter(item => item.id !== user.id);
      setListUsers(cloneListUsers);
    }
    const handleSort = (sortBy, sortField) => {
      setSortBy(sortBy); 
      setSortField(sortField)
      let cloneListUsers = _.cloneDeep(listUsers)
      cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy])
      setListUsers(cloneListUsers);
    }

    const handleSearch = debounce( (event) => {
      let term = event.target.value;
      if(term){

        let cloneListUsers = _.cloneDeep(listUsers)
        cloneListUsers = cloneListUsers.filter(item => item.email.includes(term))
        setListUsers (cloneListUsers)
        

      }else{
        getUsers(1);
      }

    }, 500)

    const getUsersExport = (event, done) => {
      let result = [];
      if (listUsers && listUsers.length > 0) {
        result.push(["Id", "Email", "First Name", "Last Name"])
        listUsers.map((item, index) => {
          let arr = [];
          arr[0] = item.id;
          arr[1] = item.email;
          arr[2] = item.first_name;
          arr[3] = item.last_name;

          result.push(arr);


        })

        setDataExport(result);
        done();
      }

    }

    const handleImportCSV = (event) =>{
      if (event.target && event.target.files && event.target.files[0]){

        let file = event.target.files[0];


            if(file.type !== "text/csv"){
              toast.error("Only text/ csv")
              return;
            }
      
            //papa local CSV file
            Papa.parse(file, {
              // header: true,
              complete:function (results) {
                let rawCSV = results.data;
                if(rawCSV>0){
                  if(rawCSV[0] && rawCSV[0].length==3){
                    if(rawCSV[0][0] !== "email"
                    ||  rawCSV[0][1] !== "first_name"
                    || rawCSV[0][2] !== "last_name")
                    {
                      toast.error("Wrong fomat Header ")
                    }else{

                      let result = [];
                      rawCSV.map((item, index) => {
                        if(index> 0 && item.length === 3){
                          let obj ={};
                          obj.email = item[0];
                          obj.first_name = item[1];
                          obj.last_name = item[2];
                          result.push(obj);

                        }
                        setListUsers(result);
                      })
                    }
                  }else{
                    toast.error("Wrong fomat")
                  }
                }else
                toast.error("not found")
                console.log("finish", results.data)
              }
            })
          
      }

    }

    return (<>
    <div className="my-3 add-new d-sm-flex">
              <span className="">List Users:</span>
              <div className='group-btns mt-sm-0 mt-0'>
                <label htmlFor='import' className='btn btn-warning'>
                  <i className='fa-solid fa-file-import'></i> Import
                </label>
                <input 
                  id='import' type='file' hidden 
                  onChange={(event)=> handleImportCSV(event)}
                />
                
                
                <CSVLink
                  filename={"users.csv"}
                  className="btn btn-primary"
                  
                  data={dataExport}
                  asyncOnClick={true}
                  onClick={getUsersExport}>
                    <i className='fa-solid fa-file-arrow-down'></i> Export
                  </CSVLink>

                <button className='btn btn-success'
                        onClick={(event)=> setIsShowModalAddNew(true)}
                >
                  <i className='fa-solid fa-circle-plus'></i> Add new</button>
              </div>
    </div>

    <div className='col-12 col-sm-4 my-3' >
      <input
        className='form-control' 
        placeholder='Search By Email...' 
        
        // value={keyword}
        onChange={(event) => handleSearch(event)}/>
    </div>
    <div className='custom-table'>
    <Table striped bordered hover >
      <thead>
        <tr>
          <th > 
            <div className='sort-header'>
              <span>ID</span>
              <span>
                <i 
                  className='fa-solid fa-arrow-down-long'
                  onClick={()=> handleSort("desc", "id") }></i>
                <i 
                  className='fa-solid fa-arrow-up-long'
                  onClick={() => handleSort("asc", "id")}></i>
              </span>
            </div>
          </th>
          <th >
            <span>Email</span>
          </th>
          <th>
            <div className='sort-header' >
              <span>First Name</span>
              <span>
                <i 
                  className='fa-solid fa-arrow-down-long'
                  onClick={()=> handleSort("desc", "first_name") }></i>
                <i 
                  className='fa-solid fa-arrow-up-long'
                  onClick={() => handleSort("asc", "first_name")}></i>
              </span>
            </div>
            
          </th>
          <th >Last Name</th>
          <th >Actions</th>

          
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
                              <button 
                                className='btn btn-danger'
                                onClick={()=> handleDeleteUser(item)}>Delete</button>
                            </td>
        </tr>
                    )
            })
        }
        
      </tbody>
    </Table>
    </div>
    
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
          handleEditUserFromModal = {handleEditUserFromModal}
          />
          <ModalConfirm

          show={isShowModalDelete}
          handleClose = {handleClose}
          dataUserDelete ={dataUserDelete}
          handleDeleteUserFromModal={handleDeleteUserFromModal}
          />
          
    </>)

}

export default TableUsers;