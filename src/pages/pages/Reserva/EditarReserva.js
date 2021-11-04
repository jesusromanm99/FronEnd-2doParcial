import React from "react";
import { Button, Text,TextInput } from "react-native-paper";
import { deleteReservation,updateReservation } from "../../libs/http";
import { StyleSheet,View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import colors from "../../res/colors";

const EditarReserva=()=>{
   /* -------------States -----------------*/
    const [name,setName]=React.useState('Reserva')
    const [observacion,setObersvacion]=React.useState('')
    const [showDropDown, setShowDropDown] = React.useState(false);
    const [flagAsistio,setFlagAsistio]=React.useState('')
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
        console.log(observacion,flagAsistio)
        const {data,error}=await updateReservation({
                idReserva:44,
                observacion,
                flagAsistio
        })
    }

    /*-----------UseEffect----------- */
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