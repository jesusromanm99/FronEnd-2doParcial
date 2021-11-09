import React from "react";
import { DataTable } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Ionicons,AntDesign } from '@expo/vector-icons';
import colors from "../res/colors";

const ReservatioItem=({idReserva,fecha,idCliente,idEmpleado,navigation})=>{
    const goToEditReservation=()=>{
        navigation.navigate('EditarReserva',{idReserva})
    } 
    return(

        <DataTable.Row>  
                        <DataTable.Cell  style={styles.cell}>{idEmpleado.nombre}</DataTable.Cell>
                        <DataTable.Cell style={styles.cell} >{idCliente.nombre}</DataTable.Cell>
                        <DataTable.Cell  style={styles.cell}>{fecha}</DataTable.Cell>
                        <DataTable.Cell numeric onPress={goToEditReservation}><AntDesign  name="edit" size={20} color={colors.primary}/></DataTable.Cell>
        </DataTable.Row>
    )
}
const styles = StyleSheet.create({
    cell:{
        flex:2,
    } 
  });
export default ReservatioItem;