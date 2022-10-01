import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import "./new.scss"
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [type, setType] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e)=>{
      setInputs(prev =>{
          return {...prev, [e.target.name]: e.target.value}
      })
  }

  const handleType = (e) =>{
      setType(e.target.value.split(","));

  }

  const handleClick = (e)=>{
      e.preventDefault();
      //to make the file name unique:
     const fileName = new Date().getTime() + file.name;
     const storage = getStorage(app);
     const storageRef = ref(storage, fileName);
     const uploadTask = uploadBytesResumable(storageRef, file);

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
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
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    const product = { ...inputs, img: downloadURL, type: type };
    addProduct(product, dispatch);
    navigate("/products", {replace: true})

 
    });
  }
);

  }

  return (
    <div className="new">
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h1 className="title">Add New Product</h1>
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

                <label htmlFor="name"> Name</label>
                 <input name="title" type="text" id="name" 
                 placeholder="Lucky Bamboo"
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = "Lucky Bamboo"} 
                 onChange={handleChange} />

                 <label htmlFor="cat"> Category</label>
                 <input name="categories" type="text" id="cat"
                 placeholder= "Low Light and Water Plants"
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = "Low Light and Water Plants"}
                 onChange={handleChange} />

                 <label htmlFor="type"> Type</label>
                 <input type="text" id="type" 
                  placeholder= "Summer Plants, Fall Plants"
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = "Summer Plants, Fall Plants" }
                 onChange={handleType}  />

                 <label htmlFor="size"> Size</label>
                 <input  name="size" type="text" id="size" 
                 placeholder= "Large Plant"
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = "Large Plant" }
                 onChange={handleChange} />
                 
                 <label htmlFor="watering"> Watering </label>
                 <textarea name="watering" type="text" id="watering"
                 placeholder="Watering Instructions..."
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = "watering instructions" }
                 onChange={handleChange} />

                  <label htmlFor="light"> Lighting</label>
                 <textarea name="light" type="text" id="light"
                 placeholder= "Lighting Instructions..."
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = "Lighting Instructions..." }
                 onChange={handleChange} />

                  <label htmlFor="temperature"> Temperature</label>
                 <textarea name="temperature" type="text" id="temperature"
                 placeholder="Temperature instructions..."
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = "Temperature instructions..." }
                 onChange={handleChange} />

                 <label htmlFor="price"> Price</label>
                 <input name="price" type="number" id="price" 
                 placeholder= "100" 
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = "100" }
                 onChange={handleChange} />

                 <label htmlFor="">In Stock</label>
                <select name="inStock" id="inStock"
                 onChange={handleChange} >
                <option value="true">Yes</option>
                 <option value="false">No</option>
                 </select>
                  </div>
            </form>
            <button onClick={handleClick} className="sendProductButton">Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewProduct
