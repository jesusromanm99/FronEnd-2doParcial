import React from "react";
import { Text } from "react-native-paper";
const EditarReserva=()=>{
   
    const [name,setName]=React.useState('Reserva')
    return(
        <>
            <Text> Editar una {name} </Text>
        </>
    )
}
export default EditarReserva