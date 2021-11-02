import React from "react";
import { Text } from "react-native-paper";
const CrearReserva=()=>{
    const [name,setName]=React.useState('Reserva')

    return(
        <>
            <Text> Crear una {name}</Text>
        </>
    )
}
export default CrearReserva