import { createContext, useReducer, useEffect } from "react"
import DarkModeReducer from "./darkModeReducer"

const INITIAL_STATE = {
    darkMode: false,
}

export const DarkModeContext = createContext(JSON.parse(localStorage.getItem("darkMode")));

export const DarkModeContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(DarkModeReducer, JSON.parse(localStorage.getItem("darkMode")));
    
    useEffect(()=>{
        localStorage.setItem("darkMode", JSON.stringify(state))

    },[state]);
    return (
        <DarkModeContext.Provider value={{darkMode: state.darkMode, dispatch}}>
            {children}
            </DarkModeContext.Provider>
    ); 
};
