import React from "react";
import { Button, Dialog, Text,TextInput } from "react-native-paper";
import { deleteReservation,updateReservation } from "../../libs/http";
import { StyleSheet,View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import colors from "../../res/colors";
import CustomDialog from "../../components/CustomDialog";
import { getReservation } from "../../libs/http";
const EditarReserva=({route,navigation})=>{
   /* -------------States -----------------*/
    const [name,setName]=React.useState('Reserva')
    const [observacion,setObersvacion]=React.useState('')
    const [showDropDown, setShowDropDown] = React.useState(false);
    const [flagAsistio,setFlagAsistio]=React.useState('')
    const {idReserva}=route.params
    const [showDialog,setShowDialog]=React.useState(false)
    const [titleDialog,setTitleDialog]=React.useState("")
    const [messageDialog,setMessageDialog]=React.useState("")
    const selectOptions=[
        {
            'label':'Si',
            'value':'S'
        },
        {
            'label':'No',
            'value':'N'
        }
    ]
    
    /* ------------Methods------------- */
    const cancelReservation=async()=>{
        const {data,error}=await deleteReservation(23)
    }
    const updateReservationToServer= async()=>{
        console.log('Datos de la Reserva',idReserva,observacion,flagAsistio)
        const {data,error}=await updateReservation({
                idReserva,
                observacion,
                flagAsistio
        })
        if(data){
            console.log('Data Actualizacion',data)
            setShowDialog(true)
            setTitleDialog("Actualizado")
            setMessageDialog("La reserva se actualizo Correctamente")
        }else{
            console.log('Erro en la actualizacion',error)
            setShowDialog(true)
            setTitleDialog("Error")
            setMessageDialog("La reserva no pudo ser Actualizado ")
        }
    }

    /*-----------UseEffect----------- */
    React.useEffect(async()=>{
        const {data}=await getReservation(idReserva)
        if(data){
            setObersvacion(data.observacion)
            setFlagAsistio(data.flagAsistio)
        }
    },[])
    return(
        <View style={styles.container}> 
            <TextInput 
                mode="outlined"
                label="Obeservacion"
                value={observacion}
                onChangeText={text => setObersvacion(text)}
                style={styles.containeritem}
            />
            <DropDown
                     label={"Asitio"}
                     mode={"outlined"}
                     visible={showDropDown}
                     showDropDown={() => setShowDropDown(true)}
                     onDismiss={() => setShowDropDown(false)}
                     value={flagAsistio}
                     setValue={setFlagAsistio}
                     list={selectOptions}
                     style={styles.containeritem}
            />
            <View style={[styles.containeritem,{flexDirection:'row',justifyContent:'space-evenly'}]}>
                <Button mode="contained" color={colors.red} onPress={cancelReservation}>Cancelar </Button>
                <Button mode="contained" onPress={updateReservationToServer}>Actualizar  </Button>
            </View>
            { showDialog && <CustomDialog title={titleDialog} message={messageDialog} visible={showDialog} setVisible={setShowDialog} />}
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
    containeritem:{
        marginVertical:15
    }
})
export default EditarReserva