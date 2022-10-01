import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import "./new.scss"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import {addClient} from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

const NewUser = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setInputs(prev =>{
        return {...prev, [e.target.name]: e.target.value}
    })
}

const handleClick =(e) =>{
  e.preventDefault();
  const fileName = new Date().getTime() + file.name;
  const storage = getStorage(app);
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on('state_changed',
  (snapshot)=>{
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
  (error)=>{

  },
  ()=>{
     // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      const client = { ...inputs, img: downloadURL};
      addClient(client, dispatch);
      navigate("/users", {replace: true})
      });

  });


}


  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1 className="title">Add New User</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src= { 
              file 
              ? URL.createObjectURL(file)
              : "https://i.postimg.cc/dtDXfYKH/no-image-icon-0.jpg"}  
              alt="" />
          </div>
          <div className="right">
            <form >
            <div className="formInput">
                <label className = "imgLablel" htmlFor="file"> 
                  Image: 
                  <DriveFolderUploadIcon className="uploadIcon"/> 
                  </label>
                <input type="file" id="file" 
                onChange={(e)=>setFile(e.target.files[0])} 
                style={{display: "none"}}/>
                <label htmlFor="username">Username</label>
                <input name="username" type="text" id="username" placeholder="Sara Mohammed" 
                onChange={handleChange}/>
                <label htmlFor="email">Email</label>
                <input name="email" type="text" id="email" placeholder="SaraM@gmail.com" 
                onChange={handleChange}/>
                <label htmlFor="password">Password</label>
                <input name="password" type="password" id="password" placeholder="At least 6 characters" 
                onChange={handleChange}/>
                <label htmlFor="Country">Country</label>
                <input name="country" type="text" id="country" placeholder="Saudi Arabia" 
                onChange={handleChange}/>
                <label htmlFor="address">Address</label>
                <input name="address" type="text" id="address" placeholder="Jeddah, Prince Fawaz Road" 
                onChange={handleChange}/>
                <label htmlFor="isAdmin">Admin</label>
                <select name="isAdmin"  id="isAdmin" 
                onChange={handleChange}>
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
              </div>

              </form>
              <button  onClick={handleClick} className="sendUserButton">Send</button>
           
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewUser
