import { publicRequest, userRequest } from "../RequestMethod";
import { loginFailure, loginStart, loginSuccess, logoutSuccess } from "./userRedux"
import  { getProductsStart, getProductsSuccess, getProductsFailure,
deleteProductsStart, deleteProductsSuccess, deleteProductsFailure,
updateProductsStart, updateProductsSuccess, updateProductsFailure,
addProductsStart, addProductsSuccess, addProductsFailure 
} from "./productRedux"
import { getClientsStart, getClientsSuccess, getClientsFailure,
    deleteClientsStart, deleteClientsSuccess, deleteClientsFailure,
    updateClientsStart, updateClientsSuccess, updateClientsFailure,
    addClientsStart, addClientsSuccess, addClientsFailure
 } from "./clientRedux";


export const login = async (dispatch, user) => {
    dispatch( loginStart() );
    try{
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data))
        
    }catch(err){
        dispatch( loginFailure() );
    }
}

export const logout = (dispatch) => {
    dispatch(logoutSuccess() );
    
}

export const getProducts = async (dispatch) => {
    dispatch(getProductsStart() );
    try{
        const res = await publicRequest.get("/products");
        dispatch(getProductsSuccess(res.data) )

    }catch(err){
        dispatch(getProductsFailure())
    }
}

export const deleteProduct = async (id, dispatch) => {
    dispatch( deleteProductsStart() );
    try{
        //const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductsSuccess(id) )

    }catch(err){
        dispatch( deleteProductsFailure())
    }
}



export const updateProduct = async (id, product, dispatch) => {
    dispatch( updateProductsStart() );
    try{
        const res = await userRequest.put(`/products/${id}`, product);
        dispatch(updateProductsSuccess(res.data))

    }catch(err){
        dispatch( updateProductsFailure())
    }
}

export const addProduct = async (product, dispatch) => {
    dispatch( addProductsStart() );
    try{
        const res = await userRequest.post("/products", product);
        dispatch(addProductsSuccess(res.data) )

    }catch(err){
        dispatch( addProductsFailure())
    }
}

export const getClients = async (dispatch) =>{
    dispatch(getClientsStart() );
    try{
        const res = await userRequest.get("/users");
        dispatch(getClientsSuccess(res.data))

    }catch (err){
        dispatch(getClientsFailure())

    }
}

export const deleteClient = async (id, dispatch) => {
    dispatch(deleteClientsStart());
    try{
        //const res = await userRequest.delete(`/users/${id}`);
        dispatch(deleteClientsSuccess(id))
    } catch(err) {
        dispatch(deleteClientsFailure())

    }
    
}

export const updateClient = async (id, client, dispatch) => {
    dispatch( updateClientsStart() );
    try{
        const res = await userRequest.put(`/users/${id}`, client);
        dispatch(updateClientsSuccess(res.data))

    }catch(err){
        dispatch( updateClientsFailure())
    }
}

export const addClient = async (client, dispatch) => {
    dispatch( addClientsStart() );
    try{
        const res = await userRequest.post("/auth/register", client);
        dispatch(addClientsSuccess(res.data) )

    }catch(err){
        dispatch( addClientsFailure())
    }
}
