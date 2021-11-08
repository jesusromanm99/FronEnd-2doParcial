import React from "react";
import { TextInput, Button } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import createFichaClinica from "../../libs/http";

const CrearFichaClinica=({navigation,route})=>{

    /*States*/
    const [motivoConsulta,setMotivoConsulta]=React.useState('')
    const [diagnostico,setDiagnostico]=React.useState('')
    const [observacion,setObservacion]=React.useState('')
    const [idEmpleado,setIdEmpleado]=React.useState(1)
    const [idCliente,setIdCliente]=React.useState(1)
    const [idTipoProducto,setIdTipoProducto]=React.useState(1)
    
    //Dialog States
    const [showDialog,setShowDialog]=React.useState(false)
    const [titleDialog,setTitleDialog]=React.useState("")
    const [messageDialog,setMessageDialog]=React.useState("")

    /*Métodos*/
    const addFicha=async()=>{
        console.log(motivoConsulta,diagnostico,observacion,idEmpleado,idCliente,idTipoProducto)

        const {data,error}=await createFichaClinica(
            {
                motivoConsulta,
                diagnostico,
                observacion,
                idEmpleado,
                idCliente,
                idTipoProducto
            }
        )
        
        setShowDialog(true)
        if(data){
            setTitleDialog('Creado')
            setMessageDialog('La ficha clinica se creo exitosamente')
            
        }else {
            setTitleDialog('Error')
            setMessageDialog('La ficha clinica no pudo crearse, quiza cometio algun error al cargar los datos')
        }
    }



    return(
        <View style={styles.container}>
     
            <TextInput
                style={styles.containeritem}
                mode="outlined"
                label="Motivo Consulta"
                value={motivoConsulta}
                onChangeText={text => setMotivoConsulta(text)}
            />

            <TextInput
                style={styles.containeritem}
                label="Diagnostico"
                mode="outlined"
                value={diagnostico}
                onChangeText={text => setDiagnostico(text)}
            />

            <TextInput
                style={styles.containeritem}
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
    container:{
        marginHorizontal:10,
        marginVertical:10
    },
    title:{
        fontSize:23
    },
    containeritem:{
        marginVertical:15
    }
}) 
export default CrearFichaClinica