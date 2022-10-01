import "./deliverylist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
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

const DeliveryList = () => {
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
    <div className="delivery">
        <Sidebar/>
        <div className="deliveryListContainer">
            <Navbar/>
            <div className="deliveryData">
                <div className="deliveryListTitle">
                    DELIVERY
                </div>
                <TableContainer component={Paper} className="table">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell className="tableCell"> Order ID</TableCell>
          <TableCell className="tableCell"> Ordering Date </TableCell>
          <TableCell className="tableCell"> Shipping Address</TableCell>
          <TableCell className="tableCell"> Estimated Delivery Date</TableCell>
          <TableCell className="tableCell"> Shipping Company</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order._id}>
            <TableCell className="trackingId">  {order._id.slice(0,15)}</TableCell>
            <TableCell className="tableCell"> {format(order.createdAt)}</TableCell>
            <TableCell className="tableCell"> {order.address}</TableCell>
            <TableCell className="tableCell">  1/10/2022 </TableCell>
            <TableCell className="tableCell">  Saudi Post </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
            </div>
        </div>
    </div>
  )
}

export default DeliveryList
