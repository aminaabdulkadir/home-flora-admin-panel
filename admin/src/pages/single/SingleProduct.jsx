import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import Chart from "../../components/chart/Chart"
import "./singleproduct.scss"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router"
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useState, useMemo, useEffect  } from "react"
import { userRequest } from "../../RequestMethod"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { updateProduct } from "../../redux/apiCalls"



const SingleProduct = () => {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [productStats, setProductStats] = useState([]);
    
    const product = useSelector((state)=> 
    state.product.products.find((product) => product._id === productId));

    const [inputs, setInputs] = useState({});
    const [file, setFile] = useState(null);
    const [type, setType] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) =>{
      setInputs(prev => {
        return {...prev, [e.target.name]: e.target.value }
      })
    };
    const handleType = (e) =>{
      setType(e.target.value.split(","));
    }

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
     const product = {...inputs, img: downloadURL, type: type};
     updateProduct(productId, product, dispatch);
     navigate("/products", {replace: true})

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
      const getProductStats = async ()=>{
        try{
          const res = await userRequest.get(`orders/income?pid=${productId}`);
          const list = res.data.sort((a,b)=>{
            return a._id - b._id
          })
           list.map((item) => 
             setProductStats((prev) => [
               ...prev,
               {name: MONTHS[item._id - 1], Sales: item.total},
          ])
        );
        }catch (err) { 
          console.log(err);
        }
      };
      getProductStats();
   },[productId, MONTHS]);

  

  
 

    
  return (
    <div className="single">
    <Sidebar/>
     <div className="singleContainer">
       <Navbar/>
       <div className="top"> 
       <div className="left"> 
       <h1 className="title"> Product Information</h1>
       <div className="item">
       <img src={product.img} alt="" className="itemImg" />
       <div className="details">
         <h1 className="itemTitle">{product.title}</h1>
         <div className="detailItem">
           <span className="itemKey"> Category :</span>
           <span className="itemValue">{product.categories}</span>
         </div>

         <div className="detailItem">
           <span className="itemKey"> Type: </span>
           <span className="itemValue"> {`${product.type}`} </span>
         </div>

         <div className="detailItem">
           <span className="itemKey"> Size: </span>
           <span className="itemValue"> {product.size} </span>
         </div>

         <div className="detailItem">
           <span className="itemKey"> Watering: </span>
           <span className="itemValue"> {`${product.watering.slice(0,50)}...`} </span>
         </div>

         <div className="detailItem">
           <span className="itemKey"> Lighting: </span>
           <span className="itemValue"> {`${product.light.slice(0,50)}...`} </span>
         </div>

         <div className="detailItem">
           <span className="itemKey"> Temperature: </span>
           <span className="itemValue"> {`${product.temperature.slice(0,50)}...`} </span>
         </div>

         <div className="detailItem">
           <span className="itemKey"> Price: </span>
           <span className="itemValue"> {product.price} SAR </span>
         </div>

         <div className="detailItem">
           <span className="itemKey">  In Stock: </span>
           <span className="itemValue"> {`${product.inStock ? "Yes" :" No"}`}</span>
         </div>
       </div>
       </div>
       </div>
       <div className="right">
         <Chart data={productStats} dataKey={"Sales"} aspect={1.9 / 1 } title= "Sales Performance over the Last Month"/>
       </div>

       </div>

       <div className="bottom">
       <h1 className="title">Edit</h1>
       <form className="form">
         <div className="formLeft">
           <label htmlFor="name">Product Name</label>
           <input name="title" type="text" id="name" placeholder={product.title} 
           onChange={handleChange}/>

           <label htmlFor="cat">Product Category</label>
           <input name="categories" type="text" id="cat" placeholder={product.categories}
           onChange={handleChange} />

           <label htmlFor="type">Product Type</label>
           <input type="text" id="type" placeholder={product.type}
           onChange={handleType} />

           <label htmlFor="size">Product Size</label>
           <input name="size" type="text" id="size" placeholder={product.size}
           onChange={handleChange} />

            <label htmlFor="watering"> Watering </label>
            <textarea name="watering" type="text" id="watering"
                 placeholder= {product.watering}
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = product.watering }
                 onChange={handleChange} />

              <label htmlFor="light"> Lighting</label>
              <textarea name="light" type="text" id="light"
                 placeholder= {product.light}
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = product.light}
                 onChange={handleChange} />

              <label htmlFor="temperature"> Temperature</label>
              <textarea name="temperature" type="text" id="temperature"
                 placeholder= {product.temperature}
                 onFocus={(e) => e.target.placeholder = ""}
                 onBlur={(e) => e.target.placeholder = product.temperature}
                 onChange={handleChange} />

           <label htmlFor="price">Product Price</label>
           <input name="price" type="number" id="price" placeholder={product.price} 
           onChange={handleChange}/>

           <label htmlFor="">In Stock</label>
           <select  name="inStock" id="inStock"
           onChange={handleChange}>
             <option value="true">Yes</option>
             <option value="false">No</option>v
           </select>

         </div>
         <div className="formRight">
           <div className="upload">
             <img src={
               file 
              ? URL.createObjectURL(file)
              : "https://i.postimg.cc/dtDXfYKH/no-image-icon-0.jpg"} alt="" 
              className="uploadImg" />

             <label htmlFor="file">
               <DriveFolderUploadIcon className="uploadIcon"/> 
               <input type="file" id="file" onChange={(e)=>setFile(e.target.files[0])} 
               style={{display: "none"}}/>
             </label>
           </div>
           <button onClick={handleClick}  className="updateButton" >Update</button>
         </div>
       </form>    
       </div>
     </div>
    </div>
  )
}

export default SingleProduct