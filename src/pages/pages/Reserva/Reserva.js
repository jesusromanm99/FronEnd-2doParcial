import React from "react";
import { Text,StyleSheet } from "react-native";
import { DataTable } from 'react-native-paper';

import { FAB } from 'react-native-paper';



export default function Reserva({navigation}){
   
    const goToCreateReservation=()=>{
            navigation.navigate('CrearReserva')
    }   
    return(
        <>
             <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Id</DataTable.Title>
                    <DataTable.Title>Empleado</DataTable.Title>
                    <DataTable.Title>Cliente</DataTable.Title>
                    <DataTable.Title>Desde</DataTable.Title>
                    <DataTable.Title>Hasta</DataTable.Title>

                </DataTable.Header>

                <DataTable.Row>
                    <DataTable.Cell>1</DataTable.Cell>
                    <DataTable.Cell >Jesus</DataTable.Cell>
                    <DataTable.Cell >Carlos</DataTable.Cell>
                    <DataTable.Cell >10/11/2021</DataTable.Cell>
                    <DataTable.Cell >12/02/2000</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                    <DataTable.Cell>1</DataTable.Cell>
                    <DataTable.Cell >Pepe</DataTable.Cell>
                    <DataTable.Cell >Enrique</DataTable.Cell>
                    <DataTable.Cell >10/11/2021</DataTable.Cell>
                    <DataTable.Cell >12/02/2000</DataTable.Cell>
                </DataTable.Row>
             </DataTable>     
            
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
    }
  });