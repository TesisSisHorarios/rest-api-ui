
import axios from 'axios';
import { mensajeAlerta } from "../utils/Mensajes";

const resp = {};
const [showAlert] = mensajeAlerta();
const url = process.env.REACT_APP_USERS_URL;

export const saveUser = async (params) => {

    try {    
        await axios.post(url, params);
        showAlert("Operación Correcta", true, "Usuario guardado");
    } catch (err) {
        console.log('ERROR');
        console.log('KO::USERS', err)
        showAlert("Operación Incorrecta", false, "Usuario no guardado");
    }
};

export const deleteUser = async (params) => {

    try {   
        await axios.delete(url+"/"+params);
        showAlert("Operación Correcta", true, "Usuario eliminado");
    } catch (err) {
        console.log('ERROR');
        console.log('KO::USERS', err)
        showAlert("Operación Incorrecta", false, "Usuario no eliminado");
    }
    return {resp}
};

export const editUser = async (id,params) => {

    try {   
        await axios.patch(url+"/"+id,params);
        showAlert("Operación Correcta", true, "Usuario eliminado");
    } catch (err) {
        console.log('ERROR');
        console.log('KO::USERS', err)
        showAlert("Operación Incorrecta", false, "Usuario no eliminado");
    }
};

export const getUser = async (pskip, plimit,callback) => {

    try {   
        await axios.get(url,{ params: { skip: pskip, limit: plimit } }).then(response =>{
            callback(response);
        })
    } catch (err) {
        console.log('ERROR');
        console.log('KO::USERS', err)
        showAlert("Operación Incorrecta", false, "Error al obtener los usuarios");
    }
};

export const getUserTotal = async (callback) => {

    try {   
        await axios.get(url).then(response =>{
            callback(response);
        })
    } catch (err) {
        console.log('ERROR');
        console.log('KO::USERS', err)
        showAlert("Operación Incorrecta", false, "Error al obtener los usuarios");
    }
};