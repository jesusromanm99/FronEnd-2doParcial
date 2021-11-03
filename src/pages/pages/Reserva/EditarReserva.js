import React from "react";
import { Button, Text } from "react-native-paper";
import { deleteReservation,updateReservation } from "../../libs/http";

const EditarReserva=()=>{
   
    const [name,setName]=React.useState('Reserva')

    const cancelReservation=async()=>{
        const {data,error}=await deleteReservation(23)
    }
    const updateReservationToServer= async()=>{
        const {data,error}=await updateReservation({
                idReserva:44,
                observacion:"hola",
                flagAsistio:"S"
        })
    }
    return(
        <>
            <Text> Editar una {name} </Text>
            <Button onPress={cancelReservation}>Eliminar Reserva</Button>
            <Button onPress={updateReservationToServer}>Actualizar Reserva </Button>
        </>
    )
}
export default EditarReserva