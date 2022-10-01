import "./featured.scss"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import CrisisAlertIcon from '@mui/icons-material/CrisisAlert';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import { useMemo, useState, useEffect } from "react";
import { userRequest } from "../../RequestMethod";

const Featured = () => {
  const [dailySales, setDailySales] = useState([]);
  const [dailyPerc, setDailyPerc] = useState(0);
  const [lastMonthIncome, setLastMonthIncome] = useState([]);

  useEffect(()=>{
    const getDailySales = async ()=>{
      try{
        const res = await userRequest.get("/orders/today-sales");
        const list = res.data.sort((a,b)=>{
          return a._id - b._id
        })
        setDailySales(list);
        setDailyPerc((list[list.length-1].totalSaleAmount * 100) / list[list.length-2].totalSaleAmount- 100)
      }catch{}
    };
    getDailySales()
    

  },[])

  

  useEffect(()=>{
    const lastMonthIncome = async ()=>{
      try{
        const res = await userRequest.get("/orders/income");
        const list = res.data.sort((a,b)=>{
          return a._id - b._id
        })
        setLastMonthIncome(list[list.length-2]?.total);
      }catch{}
    };
  
    lastMonthIncome()
    

  },[])


  
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Total Revenue</h1>
       
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={Math.floor(dailyPerc)} text={`${Math.floor(dailyPerc)}%` } strokeWidth={5}
          styles={buildStyles({
            // Rotation of path and trail, in number of turns (0-1)
            rotation: 0.60,
        
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: 'round',
        
            // Text size
            textSize: '20px',
        
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.5,
        
            // Can specify path transition in more detail, or remove it entirely
            // pathTransition: 'none',
        
            // Colors
            pathColor: `rgb(34,139,34, ${Math.floor(dailyPerc)/ 100})`,
            textColor: '#b8870bf9',
            trailColor: '#d6d6d6',
            backgroundColor: '#c7f3b2',
          })}/>

        </div>
        <p className="title">Latest Earning</p>
        <p className="amount">{dailySales[dailySales.length-1]?.totalSaleAmount} SAR</p>
        <p className="desc">Previous transactions processing. Last payments may not be included.</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult">
              <CrisisAlertIcon className="tagretIcon"/>
              <div className="targetAmount"> 3K SAR </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last 3 days</div>
            <div className="itemResult positive">
              <TimelineOutlinedIcon  fontSize="small"/>
              <div className="lastDaysIncome">
                {
              dailySales[dailySales.length-1]?.totalSaleAmount
               +
              dailySales[dailySales.length-2]?.totalSaleAmount
              + 
              dailySales[dailySales.length-3]?.totalSaleAmount
              } SAR 
              </div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult positive">
            <TimelineOutlinedIcon  fontSize="small"/>
              <div className="lastMonthIncome"> {lastMonthIncome} SAR </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Featured
