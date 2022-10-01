import "./list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClients, deleteClient } from "../../redux/apiCalls";


const UserList = () => {
  const dispatch = useDispatch();
  const clients = useSelector((state)=> state.client.clients);

  useEffect(()=>{
    getClients(dispatch);

  },[dispatch]);

  const handleDelete = (id) =>{
    deleteClient(id, dispatch)

  };

 
 

  const userColumns =[
    { field: '_id', headerName: 'ID', width: 280 },
    {field: 'username', headerName: "User", width: 230, 
    renderCell: (params) => {
        return (
          <div className="cellWithImg">
          <img className="cellImg" src={params.row.img? params.row.img : "https://i.postimg.cc/qR6KdRW8/no-profile-picture-icon-18.png" } alt="avatar"/>
          {params.row.username} 
          </div>
        )
      }},
      { field: 'email', headerName: 'Email', width: 270 },
      { field: 'isAdmin', headerName: 'Admin', width: 110 },
      { field: 'createdAt', headerName: 'Joining Date', width: 230 },
]
  const actionCoulmn = [
   { field: "action", 
   headerName: "Actions", 
   width: 200, 
   renderCell:(params)=>{
     return(
       <div className="cellAction">
         <Link to={ "/users/" + params.row._id} style={{textDecoration: "none"}}>
         <div className="viewButton"> View and Edit </div>
         </Link>
         <div className="deleteButton" onClick={()=>handleDelete(params.row._id)} > Delete </div>
       </div>
     )
  
   }},
  ]
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
    <div className="datatable">
    <div className="datatableTitle">Add New User
    <Link to= "new"  className="link">
      Add New
      </Link>
      </div>
    <DataGrid
    className="dataGrid"
      rows={clients}
      columns={userColumns.concat(actionCoulmn)}
      getRowId={(row) => row._id}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
      disableSelectionOnClick
    />
  </div>

      </div>
     
    </div>
  )
}

export default UserList
