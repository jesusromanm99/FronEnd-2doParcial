import React from "react";
import { Text,StyleSheet } from "react-native";
import { Button, DataTable } from 'react-native-paper';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import colors from "../../res/colors";
import { FAB } from 'react-native-paper';
import { getAllReservation } from "../../libs/http";
import { getScheduleByClient } from "../../libs/http";

export default function Reserva({navigation}){
   
    const goToCreateReservation=()=>{
            navigation.navigate('CrearReserva')
    }
    const goToEditReservation=()=>{
        navigation.navigate('EditarReserva')
    }   
    const getReservation=async()=>{
            const {data,error}=await getAllReservation()
    }
    const filterByClient=async(idCliente=7)=>{
        const {data,error}=await getScheduleByClient(7)

    }
    React.useEffect(()=>{
        getReservation()
    },[])
    return(
        <>
             <DataTable style={{marginLeft:0}}>
                <DataTable.Header>
                    
                    <DataTable.Title style={styles.cell}>Empleado</DataTable.Title>
                    <DataTable.Title style={styles.cell}>Cliente</DataTable.Title>
                    <DataTable.Title style={styles.cell}>Desde</DataTable.Title>
                    <DataTable.Title style={styles.cell}>Hasta</DataTable.Title>
                    <DataTable.Title numeric>Editar</DataTable.Title>

                </DataTable.Header>

                <DataTable.Row>  
                    <DataTable.Cell  style={styles.cell}>Jesus</DataTable.Cell>
                    <DataTable.Cell style={styles.cell} >Carlos</DataTable.Cell>
                    <DataTable.Cell  style={styles.cell}>10/11/2021</DataTable.Cell>
                    <DataTable.Cell  style={styles.cell}>12/02/2000</DataTable.Cell>
                    <DataTable.Cell numeric onPress={goToEditReservation}><AntDesign  name="edit" size={20} color={colors.primary}/></DataTable.Cell>
                </DataTable.Row>

                
             </DataTable>     
            <Button onPress={filterByClient}>Filtrar Por cliente</Button>
            <FAB
                style={styles.fab}
                icon="plus"
                onPress={goToCreateReservation}
            />
        </>
        
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    cell:{
        
        flex:2,
      
    }
  });