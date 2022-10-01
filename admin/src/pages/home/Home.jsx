import "./home.scss"
import Sidebar from "../../components/sidebar/Sidebar"
import Navbar from "../../components/navbar/Navbar"
import Widget from "../../components/widget/Widget"
import Featured from "../../components/featured/Featured"
import Chart from "../../components/chart/Chart"
import List from "../../components/table/Table"
import { useMemo, useState } from "react"
import { userRequest } from "../../RequestMethod"

const Home = () => {
  const [income, setIncome] = useState([]);

  const MONTHS = useMemo(
    () =>[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

   useMemo(()=>{
     const getIncome = async ()=>{
       try{
         const res = await userRequest.get("/orders/income");
         const list = res.data.sort((a,b)=>{
          return a._id - b._id
        })
          list.map((item) => 
            setIncome((prev) => [
              ...prev,
              {name: MONTHS[item._id - 1], Total: item.total},
         ])
       );
       }catch{}
     };
   getIncome();
  },[MONTHS]);
  

  return (
    <div className="home">
    <Sidebar/>
    <div className="homecontainer">
      <Navbar/>
      <div className="widgets">
      <Widget type="user"/>
      <Widget type="order"/>
      <Widget type="earning"/>
      <Widget type="balance"/>
      </div>
      <div className="charts">
        <Featured/>
        <Chart data={income} dataKey={"Total"} aspect={2.5} title="Revenue Change over the Last Two Months "/>
      </div>
      <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
        <List/>
      </div>
    </div>
    </div>
  )
}

export default Home
