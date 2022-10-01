import "./list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, getProducts } from "../../redux/apiCalls";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state)=> state.product.products);

  useEffect(()=>{
      getProducts(dispatch);

  },[dispatch]);

  const handleDelete = (id)=>{
    deleteProduct(id, dispatch)
   
  };


  const productColumns =[
    { field: '_id', headerName: 'ID', width: 240 },
    {field: 'product', headerName: "Product", width: 250, 
    renderCell: (params) => {
        return (
          <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar"/>
          {params.row.title} 
          </div>
        )
      }},
      { field: 'categories', headerName: 'Category', width: 250 },
      { field: 'price', headerName: 'Price', width: 170 },
      { field: 'inStock', headerName: 'In Stock', width: 170,
      
     },
]

  const actionCoulmn = [
   { field: "action", 
   headerName: "Actions", 
   width: 200, 
   renderCell:(params)=>{
     return(
       <div className="cellAction">
         <Link to= {"/products/" + params.row._id} style={{textDecoration: "none"}}>
         <div className="viewButton"> View and Edit </div>
         </Link>
         <div className="deleteButton" onClick={()=>handleDelete(params.row._id)}> Delete </div>
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
    <div className="datatableTitle">Add New Product
    <Link to= "new"  className="link">
      Add New
      </Link>
      </div>
    <DataGrid
    className="dataGrid"
      rows={products}
      columns={productColumns.concat(actionCoulmn)}
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

export default ProductList
