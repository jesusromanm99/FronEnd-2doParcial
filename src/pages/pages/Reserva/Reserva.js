import React from "react";
import moment from "moment";

import { Text,StyleSheet,View } from "react-native";
import { Button, DataTable,Searchbar,TextInput,Divider } from 'react-native-paper';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import colors from "../../res/colors";
import { FAB } from 'react-native-paper';
import { getAllReservation } from "../../libs/http";
import { getScheduleByClient } from "../../libs/http";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function Reserva({navigation}){
   
    /*States */
    const [searchEmpleado, setSearchEmpleado] = React.useState('');
    const [searchCliente, setSearchCliente] = React.useState('');

  
    const [endDate,setEndDate]=React.useState(new Date()) 
    const [showEndDate,setEndShowDate]=React.useState(false)

    const [startDate,setStartDate]=React.useState(new Date())
    const [showStartDate,setStartShowDate]=React.useState(false)

    /*Methods */
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
    const onChangeStartDate=(event, selectedDate) => {
        const d = selectedDate || startDate;
        setStartShowDate(false);
        setStartDate(d);
    };
    const onChangeEndDate=(event, selectedDate) => {
        const d = selectedDate || endDate;
        setEndShowDate(false);
        setEndDate(d);
    };
    const filterReservation=()=>{
        console.log('Filtrando reservas....')
    }
    /*Use Effect */
    React.useEffect(()=>{
        getReservation()
    },[])
    return(
        <>
             <Text style={[styles.space,styles.title]}>Filtar reserva:</Text>
             <TextInput 
                mode="outlined"
                label="Empleado"
                value={searchEmpleado}
                onChangeText={text => setSearchEmpleado(text)}
                style={styles.space}
            />
             <TextInput 
                mode="outlined"
                label="Cliente"
                value={searchCliente}
                onChangeText={text => setSearchCliente(text)}
                style={styles.space}
            />
            
            <View style={[styles.space,{flexDirection:'row',justifyContent:'space-evenly'}]}>
                    <Text>
                        <Text style={{textDecorationLine:'underline',color:colors.primary,fontWeight: 'bold'}} onPress={()=>setStartShowDate(true)}>Fecha Inicio:</Text>
                        <Text>{' '+startDate.toLocaleDateString()}</Text>
                    </Text>
                    <Text>
                        <Text style={{textDecorationLine:'underline',color:colors.primary,fontWeight: 'bold'}} onPress={()=>setEndShowDate(true)}>Fecha Fin:</Text>
                        <Text>{' '+endDate.toLocaleDateString()}</Text>
                    </Text>     
            </View>
            <Button mode="contained" onPress={filterReservation} 
                    style={[{width:100,marginLeft:'40%'},styles.space]}>Filtrar</Button>
            <Divider style={styles.space} colors={colors.primary}/>

            {showStartDate &&   
                <DateTimePicker
                
                value={startDate}
                mode="date"
                display="default"
                onChange={onChangeStartDate}
                textColor={colors.primary}
                
                 />
            }
            {showEndDate && 
                <DateTimePicker
                
                value={endDate}
                mode="date"
                display="default"
                onChange={onChangeEndDate}
                textColor={colors.primary}
                
                 />
            }
             
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
    },
    space:{
        marginTop:10,
        marginHorizontal:8
    },
    title:{
        fontSize:23 
    }
  });