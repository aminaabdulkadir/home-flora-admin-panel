import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../RequestMethod";
import { format } from 'timeago.js';





const List = () => {
  const [orders, setOrders] = useState([]);

  useEffect(()=>{
    const getOrders = async()=>{
      try{
        const res = await userRequest.get("/orders");
        setOrders(res.data);
      }catch{}
    };
    getOrders()
  },[]);

 

  
  return (
    <TableContainer component={Paper} className="table">
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell"> Tracking ID</TableCell>
          <TableCell className="tableCell"> Product Name </TableCell>
          <TableCell className="tableCell"> Customer</TableCell>
          <TableCell className="tableCell"> Purchase Date</TableCell>
          <TableCell className="tableCell"> Amount</TableCell>
          <TableCell className="tableCell">Address</TableCell>
          <TableCell className="tableCell"> Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell className="tableCell">  {order._id.slice(0,15)}</TableCell>
            <TableCell className="tableCell" > 
            <div className="cellWrapper">
              <div className="productName">
                {order.products[0].productName
                ? order.products[0].productName 
                : "Home Flora"}
              </div>
              <img src= {
                  order.products[0].productImg
                ? order.products[0].productImg
                 : "https://i.postimg.cc/qq6XLtpc/Amaryllis.jpg"
                 } 
                 alt="" className="image" />
               </div>
            </TableCell>
            <TableCell className="tableCell"> {order.customer}</TableCell>
            <TableCell className="tableCell"> {format(order.createdAt)}</TableCell>
            <TableCell className="tableCell"> {order.total}</TableCell>
            <TableCell className="tableCell"> {order.address}</TableCell>
            <TableCell className="tableCell"> 
            <span className={`status ${order.status}`} >{order.status}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default List
