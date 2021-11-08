import React from "react";

import { Text,StyleSheet,View, ScrollView,RefreshControl } from "react-native";
import { Button, DataTable,Searchbar,TextInput,Divider,ActivityIndicator } from 'react-native-paper';
import { Ionicons,AntDesign } from '@expo/vector-icons';
import colors from "../../res/colors";
import { FAB } from 'react-native-paper';
import { getAllReservation } from "../../libs/http";
import { getScheduleByClient } from "../../libs/http";
import DateTimePicker from '@react-native-community/datetimepicker';
import ReservationItem from "../../components/ReservationItem";

export default function Reserva({navigation}){
   
    /*States */
    const [searchEmpleado, setSearchEmpleado] = React.useState('');
    const [searchCliente, setSearchCliente] = React.useState('');

  
    const [endDate,setEndDate]=React.useState(new Date()) 
    const [showEndDate,setEndShowDate]=React.useState(false)

    const [startDate,setStartDate]=React.useState(new Date())
    const [showStartDate,setStartShowDate]=React.useState(false)

    const [reservationList,setReservationList]=React.useState([])

    const [loaded,setLoaded]=React.useState(true)

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async() => {
        setRefreshing(true);
        await getAllReservation()
        setRefreshing(false)
    }, []);
    /*Methods */
    const goToCreateReservation=()=>{
            navigation.navigate('CrearReserva')
    }
    const goToEditReservation=(idReserva=3)=>{
        navigation.navigate('EditarReserva',{idReserva})
    }   
    const getReservation=async()=>{
            const {data,error}=await getAllReservation()
            if(data){
                setReservationList(data.lista)
                setLoaded(false)
            }
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
        
        let result=[]
        if(searchEmpleado){
            result= reservationList.filter((item)=>item.idEmpleado.nombre==searchEmpleado)
            console.log('ResultReservas',result)
        }
        if(searchCliente){
            result= result 
                     ? result.concat(result.filter((item)=>item.idCliente.nombre==searchCliente))
                     : reservationList.filter((item)=>item.idCliente.nombre==searchCliente)   
            console.log('ResultReservasCliente..',result)        
        }
        if(startDate && endDate){
            console.log('Fecha',startDate,endDate)
        }
        setReservationList(result)
    }
    /*Use Effect */
    React.useEffect(()=>{
        getReservation()
    },[])
    return(
        <>
             {loaded ? 
             <ActivityIndicator animating={true} color={colors.primary} />
             : 
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
                <ScrollView 
                    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                        />
                    }
                >
                    <DataTable style={{marginLeft:0}}>
                        <DataTable.Header>
                            
                            <DataTable.Title style={styles.cell}>Empleado</DataTable.Title>
                            <DataTable.Title style={styles.cell}>Cliente</DataTable.Title>
                            <DataTable.Title style={styles.cell}>Fecha</DataTable.Title>
                            <DataTable.Title numeric>Editar</DataTable.Title>

                        </DataTable.Header>
                        {reservationList.map((item,index)=>{
                            return <ReservationItem key={index} fecha={item.fecha} idCliente={item.idCliente} 
                                                    idEmpleado={item.idEmpleado} fecha={item.fecha} navigation={navigation}
                                                    idReserva={item.idReserva}
                                                    />
                        })}
                        

                        
                    </DataTable>     
                </ScrollView>
                <FAB
                    style={styles.fab}
                    icon="plus"
                    onPress={goToCreateReservation}
                />
            </>
            }
             
             
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