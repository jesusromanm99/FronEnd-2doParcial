/* HTTP REQUESTS  */

import axios from "axios"
const server="https://equipoyosh.com/"

/* ----------------Global----------------------------- */

/*Obtener solo los usuarios del sistema con UserLogin!=null */
const getUsersFromSystem=async()=>{
    const endPoint=server+'stock-nutrinatalia/persona'
    try{
        const {data} = await axios.get(endPoint,{params:{ejemplo:{"soloUsuariosDelSistema":true}}})
        return {data}
    }catch(error){
        console.log(error)
        return {error}
    }
}

/* Obtener los usuarios con UserLogin igual a null */
const getUsers=async()=>{
    const endPoint=server+'stock-nutrinatalia/persona'
    try{
        const {data} = await axios.get(endPoint)
        return {data:data.lista.filter(user=>user.usuarioLogin==null)}
    }catch(error){
        console.log(error)
        return {error}
    }
}
/* ----------------Reserva---------------------------- */

/*Obtener todas las reservas */
const getAllReservation=async()=>{
    const endPoint=server+'stock-nutrinatalia/reserva'
    try{
        const {data}=await axios.get(endPoint)
        
        return {data}
    }catch(error){
            console.log('Error:',error)
            return {error}
    }

}

/* Crear una nueva reserva */
const createReservation=async({fechaCadena,horaInicioCadena,horaFinCadena,idEmpleado,idCliente})=>{
    const endPoint=server+'stock-nutrinatalia/reserva'
    try{
        const {data}=await axios.post(endPoint,
            {fechaCadena,horaInicioCadena,horaFinCadena,idEmpleado:{idPersona:idEmpleado},idCliente:{idPersona:idCliente} })
        console.log('Data',data)
        return {data}
    }catch(error){
            console.log('Error',error.response.data)
            return {error}
    }
}

/* Eliminar una nueva reserva */
const deleteReservation=async(idReservation)=>{
    const endPoint=`${server}stock-nutrinatalia/reserva/${idReservation}`
    try{
        const {data}=await axios.delete(endPoint)
        console.log('Data',data)
        return {data}
    }catch(error){
            console.log('Error',error.response.data)
            return {error}
    }
}

/*Actualiza una reserva */
const updateReservation=async({idReserva,observacion,flagAsistio})=>{
    const endPoint=server+'stock-nutrinatalia/reserva'
    try{
        const {data}=await axios.put(endPoint,{idReserva,observacion,flagAsistio})
        console.log('Data',data)
        return {data}
    }catch(error){
            console.log('Error',error.response.data)
            return {error}
    }
}

/* Obtener las reservas Libres de un Fisioterapueta para una fecha dada */
const getScheduleClear=async(idEmpleado,fecha,disponible='S')=>{
    const endPoint=`${server}stock-nutrinatalia/persona/${idEmpleado}/agenda`
    try{
        const {data}=await axios.get(endPoint,{ params: {fecha,disponible} } )
        console.log('Data',data)
        return {data}
    }catch(error){
            console.log('Error:',error.response)
            return {error}
    }
}

/*Obtener las reservas  realizadas por un cliente */
const getScheduleByClient=async(idPersona)=>{
    const endPoint=`${server}stock-nutrinatalia/reserva`
    try{
        const paramsPayload=`{"idCliente":{"idPersona":${idPersona}}}`
        
        const {data}=await axios.get(endPoint,{ params: {ejemplo:paramsPayload}})
        console.log('Data',data)
        return {data}
    }catch(error){
            console.log('Error:',error)
            return {error}
    }
}


/*---------------------Ficha------------------------------ */


/*----------------------Paciente--------------------------- */

const getPacientes = async(name, lastname)=>{
    const endPoint=server+'stock-nutrinatalia/persona'
    try{
        let queryParams = ''
        if(name && lastname){
            queryParams = `?like=S&ejemplo={"nombre":"${name}","apellido":"${lastname}"}`
        }else if (name){
            queryParams = `?like=S&ejemplo={"nombre":"${name}"}`
        }
        else if (lastname){
            queryParams = `?like=S&ejemplo={"apellido":"${lastname}"}`
        }
        queryParams = encodeURI(queryParams)
        const {data}=await axios.get(endPoint+queryParams)
        return {data: data.lista}
    }catch(error){
        console.log(error)
        return {error}
    }
} 


/*Export  */
export {
    getAllReservation,
    createReservation,
    deleteReservation,
    updateReservation,
    getScheduleClear,
    getScheduleByClient,
    getUsersFromSystem,
    getUsers,
    getPacientes,
}