import React from "react";
import { Button, Text,TextInput } from "react-native-paper";
import { StyleSheet,View } from "react-native";
import { createFicha } from "../../libs/http";
const CrearFicha=({navigation,route})=>{


    //imprimir valor recibido de parametro
    console.log('Params',route.params)
    /*States */
    const [motivoConsulta,setMotivoConsulta]=React.useState('')
    const [diagnostico,setDiagnostico]=React.useState('')
    const [observacion,setObservacion]=React.useState('')
    const [idEmpleado,setIdEmpleado]=React.useState(1)
    const [idCliente,setIdCliente]=React.useState(1)
    const [idTipoProducto,setIdTipoProducto]=React.useState(1)
    /*Methods */
    const addFicha=async()=>{
            let idEmpleado=1
            let idCliente=21
            let idTipoProducto=40
            //console.log('Valores',motivoConsulta,diagnostico,observacion,idEmpleado,idCliente,idTipoProducto)
            const {data,error}=await createFicha({motivoConsulta,diagnostico,observacion,idEmpleado,idCliente,idTipoProducto})

    }
    return (
        
        <View style={styles.container}>
     
            <TextInput
                style={styles.space}
                mode="outlined"
                label="Motivo Consulta"
                value={motivoConsulta}
                onChangeText={text => setMotivoConsulta(text)}
            />

            <TextInput
                style={styles.space}
                label="Diagnostico"
                mode="outlined"
                value={diagnostico}
                onChangeText={text => setDiagnostico(text)}
            />

            <TextInput
                style={styles.space}
                mode="outlined"
                label="Observacion"
                value={observacion}
                onChangeText={text => setObservacion(text)}
            />
            <Button onPress={addFicha}>Crear Ficha</Button>
            
        </View>
    )


}
const styles=StyleSheet.create({
    space:{
        marginVertical:10
    },
    container:{
        marginHorizontal:10
    }
    

})
export default CrearFicha