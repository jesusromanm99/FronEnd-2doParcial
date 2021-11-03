import React from "react";
import { Button, Text } from "react-native-paper";
import { createReservation,getScheduleClear } from "../../libs/http";
const CrearReserva=()=>{
    const [name,setName]=React.useState('Reserva')
    const addReservation=async()=>{
            const {data,error}=await createReservation(
                {
                    "fechaCadena": "20190903",
                    "horaInicioCadena":"1000",
                    "horaFinCadena":"1015",
                    "idEmpleado":3,
                    "idCliente":7
                }
            )
    }
    const getScheduleFree=async()=>{
        const {data,error}=await getScheduleClear(4,'20190903')
    }
    return(
        <>
            <Text> Crear una {name}</Text>
            <Button onPress={addReservation}>Crear Reserva</Button>
            <Button onPress={getScheduleFree}>Obtener agenda Libre</Button>
        </>
    )
}
export default CrearReserva