import List from "../../components/table/Table";
import "./orderlist.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

const OrderList = () => {
  return (
    <div className="orders">
        <Sidebar/>
       <div className="ordersListContainer">
           <Navbar/>
           <div className="ordersData">
        <div className="ordersListTitle">ORDERS
        </div>
        <List/>
        </div>
      </div>
    </div>
  )
}

export default OrderList
