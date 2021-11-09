import React from "react";
import { StyleSheet,View } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { getFichaClinica, updateFichaClinica } from "../../libs/http";
import CustomDialog from "../../components/CustomDialog";

const EditarFichaClinica=({route,navigation})=>{
    
    /* States */
    const [observacion,setObersvacion]=React.useState('')
    const {idFichaClinica}=route.params
    const [showDialog,setShowDialog]=React.useState(false)
    const [titleDialog,setTitleDialog]=React.useState("")
    const [messageDialog,setMessageDialog]=React.useState("")

    /* ------------Methods------------- */
    const updateFichaClinicaToServer= async()=>{
        console.log('Datos de la Ficha Clinica',idFichaClinica,observacion)
        const {data,error}=await updateFichaClinica({
                idFichaClinica,
                observacion
        })
        if(data){
            
            setShowDialog(true)
            setTitleDialog("Actualizado")
            setMessageDialog("La Ficha Clinica se actualizó correctamente")
        }else{
            console.log('Error en la actualización',error)
            setShowDialog(true)
            setTitleDialog("Error")
            setMessageDialog("La Ficha Clinica no pudo ser actualizada ")
    }
    }
    const goBack=()=>{
        navigation.goBack()
    }
    /*-----------UseEffect----------- */
    React.useEffect(async()=>{
        const {data}=await getFichaClinica(idFichaClinica)
        if(data){
            setObersvacion(data.observacion)
        }
    },[])

    return (
        <View style={styles.container}>
            <Text style={styles.texto}>Único campo editable:</Text>
            <TextInput 
                mode="outlined"
                label="Observación"
                value={observacion}
                onChangeText={text => setObersvacion(text)}
                style={styles.containeritem}
            />
            
            <View style={[styles.containeritem,{flexDirection:'row',justifyContent:'space-evenly'}]}>
                <Button mode="contained" onPress={updateFichaClinicaToServer}>Actualizar  </Button>
            </View>
            { showDialog && <CustomDialog title={titleDialog} message={messageDialog} 
                            visible={showDialog} setVisible={setShowDialog}
                            action={goBack}
                            />}
        </View>
    )
}
const styles=StyleSheet.create({
    container:{
        marginHorizontal:10,
        marginVertical:10
    },
    title:{
        fontSize:15
    },
    texto:{
        fontSize:16
    },
    containeritem:{
        marginVertical:15
    }
})
export default EditarFichaClinica