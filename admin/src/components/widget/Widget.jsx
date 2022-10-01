import "./widget.scss"
import SwapVertOutlinedIcon from '@mui/icons-material/SwapVertOutlined';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MoneyOutlinedIcon from '@mui/icons-material/MoneyOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../RequestMethod";
import { Link } from "react-router-dom";

const Widget = ({ type }) => {
  let data;
  const [userStats, setUserStats] = useState([]);
  const [userPerc, setUserPerc] = useState(0);
  const [income, setIncome] = useState([]);
  const [incomePerc, setIncomePerc] = useState(0);
  const [orderStats, setOrderStats] = useState([]);
  const [orderPerc, setOrderPerc] = useState(0);
  let balance = 0;
  let lastBalance = 0;
  let balancePerc = 0;





  useMemo(()=>{
    const getUserStats = async ()=>{
      try{
        const res = await userRequest.get("/users/stats");
        const list = res.data.sort((a,b)=>{
          return a._id - b._id
        })
        setUserStats(list);
        setUserPerc((list[list.length-1].total * 100) / list[list.length-2].total - 100)
      }catch{}
    };
  
    getUserStats()
    

  },[])
 
  


  useEffect(()=>{
    const getIncome = async ()=>{
      try{
        const res = await userRequest.get("/orders/income");
        const list = res.data.sort((a,b)=>{
          return a._id - b._id
        })
        setIncome(list);
        setIncomePerc((list[list.length-1].total * 100) / list[list.length-2].total - 100)
      }catch{}
    };
  
    getIncome()
    

  },[])

 const findBalancePerc = ()=> {
  for(let i=0; i < income?.length; i++){
    balance += income[i]?.total;
  }
  for(let i=0; i < income?.length-1; i++){
    lastBalance += income[i]?.total;
  }
  balancePerc= (balance * 100) / lastBalance - 100
  
}
findBalancePerc();






  useEffect(()=>{
    const getOrderStats = async ()=>{
      try{
        const res = await userRequest.get("/orders/stats");
        const list = res.data.sort((a,b)=>{
          return a._id - b._id
        })
        setOrderStats(list);
        setOrderPerc((list[list.length-1].total * 100) / list[list.length-2].total - 100)
      }catch{}
    };
  
    getOrderStats()
    

  },[])


 




  switch(type){
    case "user" :
      data= {
        title: "USERS",
        counter: userStats[userStats.length-1]?.total,
        isMoney: false,
        ratio: Math.floor(userPerc),
        link: 
        <Link to="/users" style={{textDecoration: "none", color: "inherit"}}> 
        See all users
        </Link> 
        ,
        icon: (
         <PeopleIcon className="icon" style={{
           color: "#eff786",
           backgroundColor: "#777a567a",
         }}/>
        )
      };
      break;
      case "order" : 
      data={
        title: "ORDERS",
        counter: orderStats[orderStats.length-1]?.total,
        isMoney: false,
        ratio: Math.floor(orderPerc),
        link: 
         <Link to="/orders" style={{textDecoration: "none", color: "inherit"}}>
           View all orders
           </Link>
        ,
        icon: ( <ShoppingCartOutlinedIcon className="icon" style={{
          color: "#551606",
          backgroundColor: "#FFE6E8",

        }}/>

        )
      };
      break;
      case "earning" : 
      data={
        title: "EARNINGS",
        counter: income[income.length-1]?.total,
        isMoney: true,
        ratio: Math.floor(incomePerc),
        link: <Link to="/orders" style={{textDecoration: "none", color: "inherit"}}>
        See earning details
        </Link>
        ,
        icon: ( 
        <MoneyOutlinedIcon className="icon" style={{
          color: "#665D1E",
          backgroundColor: "#B6B6B4",

        }}/>
        )
      };
      break;
      case "balance" : 
      data={
        title: "BALANCE",
        counter: balance,
        isMoney: true,
        ratio: Math.floor(balancePerc),
        link: "See details",
        icon: ( <AccountBalanceOutlinedIcon className="icon" style={{
          color: "#6F2DA8",
          backgroundColor: "#DCD0FF",

        }}/>

        )
      };
      break;
      default: 
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter"> {data.counter} {data.isMoney && " SAR"}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage ">
               {data.ratio}% 
               { data.ratio < 0 ? (
                 <KeyboardArrowDownIcon className="negative" />
               ) : (
                <KeyboardArrowUpIcon className="positive" />
               )}
        </div>
          {data.icon}
      </div>
    </div>
  );
};

export default Widget
