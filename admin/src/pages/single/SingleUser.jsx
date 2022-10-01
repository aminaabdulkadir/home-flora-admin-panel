import "./singleuser.scss"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Chart from "../../components/chart/Chart"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import { useMemo, useState} from "react"
import { userRequest } from "../../RequestMethod"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { updateClient} from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";




const SingleUser = () => {
  const location = useLocation();
    const userId = location.pathname.split("/")[2];
    const [usersStats, setUsersStats] = useState([]);

    const user = useSelector((state)=> 
    state.client.clients.find((user) => user._id === userId));

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) =>{
      setInputs(prev => {
        return {...prev, [e.target.name]: e.target.value }
      })
    };

    const handleClick = (e) =>{
      e.preventDefault();
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
      
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
    const client = {...inputs, img: downloadURL};
    updateClient(userId, client, dispatch);
    navigate("/users", {replace: true})
 
    });
  });

};




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
      const getUsersStats = async ()=>{
        try{
          const res = await userRequest.get(`orders/income?sid=${userId}`);
          console.log(res)
          const list = res.data.sort((a,b)=>{
            return a._id - b._id
          })
           list.map((item) => 
             setUsersStats((prev) => [
               ...prev,
               {name: MONTHS[item._id - 1], Spending: item.total},
          ])
        );
        }catch (err) { 
          console.log(err);
        }
      };
      getUsersStats();
   },[userId, MONTHS]);

   console.log(usersStats)
  

  return (
    <div className="single">
    <Sidebar/>
     <div className="singleContainer">
       <Navbar/>
       <div className="top"> 
       <div className="left"> 
       <h1 className="title">User Information</h1>
       <div className="item">
       <img src= {user.img ? user.img : "https://i.postimg.cc/qR6KdRW8/no-profile-picture-icon-18.png"} alt="" className="itemImg" />
       <div className="details">
         <h1 className="itemTitle">{user.username}</h1>
         <div className="detailItem">
           <span className="itemKey"> Email :</span>
           <span className="itemValue">{user.email}</span>
         </div>

         <div className="detailItem">
           <span className="itemKey"> Joining Date: </span>
           <span className="itemValue"> {user.createdAt} </span>
         </div>

         <div className="detailItem">
           <span className="itemKey"> County:</span>
           <span className="itemValue"> {user.country? user.country : "Not specified"}</span>
         </div>
         
         <div className="detailItem">
           <span className="itemKey"> Address: </span>
           <span className="itemValue"> {user.address? user.address : "Not specified"} </span>
         </div>

         <div className="detailItem">
           <span className="itemKey"> Admin: </span>
           <span className="itemValue"> {`${user.isAdmin ? "Yes" :" No"}`} </span>
         </div>


       </div>
       </div>
       </div>
       <div className="right">
         <Chart  data={usersStats} dataKey={"Spending"} aspect={2.5 / 1 } title= "User Spending over the Last Month "/>
       </div>

       </div>

       <div className="bottom">
       <h1 className="title">Edit</h1>
       <form className="form">
         <div className="formLeft">
           <label htmlFor="username">Username</label>
           <input name="username"type="text" id="username" placeholder={user.username}
           onChange={handleChange} />
           <label htmlFor="email">Email</label>
           <input name="email" type="text" id="email" placeholder={user.email} 
           onChange={handleChange}/>
           <label htmlFor="date">Joining Date</label>
           <input name="createdAt" type="text" id="date" placeholder={user.createdAt} 
           onChange={handleChange}/>
           <label htmlFor="country">Country</label>
           <input name="country" type="text" id="country" placeholder={user.country} 
           onChange={handleChange}/>
           <label htmlFor="address">Address</label>
           <input name="address" type="text" id="address" placeholder={user.address} 
           onChange={handleChange}/>
           <label htmlFor="isAdmin">isAdmin</label>
           <select name="isAdmin"  id="isAdmin" 
           onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
         </div>
         <div className="formRight">
           <div className="upload">
             <img src={
               file
             ? URL.createObjectURL(file)
             :"https://i.postimg.cc/qR6KdRW8/no-profile-picture-icon-18.png"} 
             alt="" className="uploadImg" />

             <label htmlFor="file">
               <DriveFolderUploadIcon className="uploadIcon"/> 
               <input type="file" id="file" onChange={(e)=>setFile(e.target.files[0])} 
               style={{display: "none"}}/>
             </label>
           </div>
           <button onClick={handleClick}  className="updateButton">Update</button>
         </div>
       </form>    
       </div>
     </div>
    </div>
  )
}

export default SingleUser
