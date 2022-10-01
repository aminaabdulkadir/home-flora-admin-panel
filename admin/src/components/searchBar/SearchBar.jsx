import "./searchBar.scss";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from "react-redux";
import { useState } from "react";

const SearchBar = () => {
    const products = useSelector((state)=>state.product.products);
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (e)=>{
        const searchWord = e.target.value;
        setWordEntered(searchWord);
       const newFilter = products.filter((value)=>{
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });
       
        if(searchWord === ""){
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }

    };

    const clearInput = () =>{
        setFilteredData([]);
        setWordEntered("");
    };


  return (
    <div className="searchBar">
       <div className="search">
          <div className="searchInputs">
          <input 
          type="text" 
          placeholder= {"Search.."}
          value={wordEntered}
          onChange={handleFilter}
          onFocus={(e) => e.target.placeholder = ""}
          onBlur={(e) => e.target.placeholder = "Search.."}
           />
           <div className="searchIcon">
               {filteredData.length === 0 
                ? 
                    ( <SearchOutlinedIcon /> )
                :   (<CloseIcon onClick={clearInput}/> )
                }
          </div>
          </div>
         {filteredData.length !==0 && (
          <div className="dataResult">
          {filteredData.slice(0, 5).map((value)=>{
              return(
           <a  className="dataItem" key={value._id}  href={`/products/${value._id}`} target="_blank" rel="noreferrer">
              <p className="itemTitle">{value.title}</p>
            </a>
              );
            })}
          </div>
         )}
        </div>  
    </div>
  )
}

export default SearchBar
