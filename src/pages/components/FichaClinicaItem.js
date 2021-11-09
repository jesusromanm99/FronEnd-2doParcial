import React from "react";
import { DataTable } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Ionicons,AntDesign } from '@expo/vector-icons';
import colors from "../res/colors";

const FichaClinicaItem=({idFichaClinica,motivoConsulta,idCliente,idEmpleado,diagnostico,idTipoProducto,navigation})=>{
    const goToEditFichaClinica=()=>{
        navigation.navigate('EditarReserva',{idFichaClinica})
    } 
    return(

        <DataTable.Row>  
                        <DataTable.Cell  style={styles.cell}>{idEmpleado.nombre}</DataTable.Cell>
                        <DataTable.Cell style={styles.cell} >{idCliente.nombre}</DataTable.Cell>
                        <DataTable.Cell  style={styles.cell}>{motivoConsulta}</DataTable.Cell>
                        <DataTable.Cell  style={styles.cell}>{diagnostico}</DataTable.Cell>
                        <DataTable.Cell  style={styles.cell}>{idTipoProducto.descripcion}</DataTable.Cell>
                        <DataTable.Cell numeric onPress={goToEditFichaClinica}><AntDesign  name="edit" size={20} color={colors.primary}/></DataTable.Cell>
        </DataTable.Row>
    )
}
const styles = StyleSheet.create({
    cell:{
        flex:2,
    } 
  });
export default FichaClinicaItem;