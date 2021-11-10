import React from "react";
import { StyleSheet, ScrollView, RefreshControl, View } from "react-native";
import { FAB, Text,TextInput, Button, DataTable,Divider,ActivityIndicator } from "react-native-paper";
import FichaClinicaItem from "../../components/FichaClinicaItem";
import { getAllFicha, getCategorias, getTipoProductos } from "../../libs/http";
import DateTimePicker from '@react-native-community/datetimepicker';
import colors from "../../res/colors";
import DropDown from "react-native-paper-dropdown";

export default function Ficha({navigation}){
  
  /*States */
  const [listFichas,setListFichas]=React.useState([])
  const [searchEmpleado, setSearchEmpleado] = React.useState('');
  const [searchCliente, setSearchCliente] = React.useState('');
  const [searchTipoProducto, setSearchTipoProducto] = React.useState('');
  const [showEndDate,setEndShowDate]=React.useState(false)
  const [startDate,setStartDate]=React.useState(null)
  const [endDate,setEndDate]=React.useState(null) 
  const [showStartDate,setStartShowDate]=React.useState(false)
  const [loaded,setLoaded]=React.useState(true)

  const [refreshing, setRefreshing] = React.useState(false);


  /* Métodos */
  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    await getFichaFromServer()
    setRefreshing(false)
  }, []);

  const resetFieldSearch=()=>{
      setSearchEmpleado('')
      setSearchCliente('')
      setSearchTipoProducto('')
      setEndDate(null)
      setStartDate(null)
  }
  

  const goTocreateFichaClinica=()=>{
    navigation.navigate('CrearFichaClinica')
  }

  const getFichaFromServer=async()=>{
    const {data,error}=await getAllFicha()
    if(data){
      setListFichas(data.lista)
    }
  }

  const getFichaOnLoad=async()=>{
      const {data,error}=await getAllFicha()
      if(data){
          setListFichas(data.lista.filter((item)=>isBetween(new Date(),new Date(),item.fechaHora)))
          setLoaded(false)
      }
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
  
  const isBetween=(fromDate,toDate,checkDate1)=>{
      let checkDate=checkDate1.split('-')
      var check = new Date(checkDate[0], parseInt(checkDate[1]) - 1, parseInt(checkDate[2]) )
      return check >= fromDate.setHours(0,0,0,0) && check <= toDate.setHours(0,0,0,0)
  }
const filterFichaClinica=()=>{

    let result=[]
    if(searchEmpleado){
        result= listFichas.filter((item)=>item.idEmpleado.nombre==searchEmpleado)
    }
    //1636243200000
    if(searchCliente){
        
        result= result.length 
                 ? result.filter((item)=>item.idCliente.nombre==searchCliente)
                 : listFichas.filter((item)=>item.idCliente.nombre==searchCliente)        
    }

    if(searchTipoProducto){
        console.log('tipo producto',searchTipoProducto)
        result = result.length
                ? result.filter((item)=>item.idTipoProducto.descripcion==searchTipoProducto)
                : listFichas.filter((item)=>item.idTipoProducto.descripcion==searchTipoProducto)
    }

    if(startDate && endDate){   
        console.log('Fecha',startDate.getTime(),endDate.getTime())
        result= result.length 
                 ? result.filter(item=>isBetween(startDate,endDate,item.fechaHora))
                 : listFichas.filter(item=>isBetween(startDate,endDate,item.fechaHora))
      
    }
    setListFichas([...result])  
  }

  React.useEffect(()=>{
    // getFichaFromServer()
    getFichaOnLoad()
  },[])

  return(
      <>
          {loaded ? 
             <ActivityIndicator animating={true} color={colors.primary} />
             : 
             <>
                
              <View style = {styles.containerinputs}>
                <Text style={[styles.space,styles.title]}>Filtrar Fichas Clinicas:</Text>
                <TextInput 
                    mode="outlined"
                    label="Fisioterapeuta"
                    value={searchEmpleado}
                    onChangeText={text => setSearchEmpleado(text)}
                    style={styles.space}
                />
                <TextInput 
                    mode="outlined"
                    label="Paciente"
                    value={searchCliente}
                    onChangeText={text => setSearchCliente(text)}
                    style={styles.space}
                />
                  
                <TextInput 
                    mode="outlined"
                    label="Tratamiento"
                    value={searchTipoProducto}
                    onChangeText={text => setSearchTipoProducto(text)}
                    style={styles.space}
                />
              </View>
              <View style={[styles.space,{flexDirection:'row',justifyContent:'space-evenly'}]}>
                        <Text>
                            <Text style={{textDecorationLine:'underline',color:colors.primary,fontWeight: 'bold'}} onPress={()=>setStartShowDate(true)}>Fecha Inicio:</Text>
                            <Text>{startDate && ' '+startDate.toLocaleDateString()}</Text>
                        </Text>
                        <Text>
                            <Text style={{textDecorationLine:'underline',color:colors.primary,fontWeight: 'bold'}} onPress={()=>setEndShowDate(true)}>Fecha Fin:</Text>
                            <Text>{endDate && ' '+endDate.toLocaleDateString()}</Text>
                        </Text>     
                </View>
                <View style={[{flexDirection:'row',justifyContent:'space-evenly'},styles.space]}>
                    <Button mode="contained" onPress={filterFichaClinica} 
                        >Filtrar</Button>
                    <Button mode="contained" onPress={resetFieldSearch} 
                        >Limpiar Filtros</Button>
                </View>
                
                <Divider style={styles.space} colors={colors.primary}/>

                {showStartDate &&   
                    <DateTimePicker
                    
                    value={startDate || new Date()}
                    mode="date"
                    display="default"
                    onChange={onChangeStartDate}
                    textColor={colors.primary}
                    
                    />
                }
                {showEndDate && 
                    <DateTimePicker
                    
                    value={endDate || new Date() }
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
          <DataTable style={{marginLeft:0,paddingBottom:80}}>
              <DataTable.Header>
                  
                  <DataTable.Title style={styles.cell}>Fisioterapeuta</DataTable.Title>
                  <DataTable.Title style={styles.cell}>Paciente</DataTable.Title>
                  <DataTable.Title style={styles.cell}>Motivo</DataTable.Title>
                  <DataTable.Title style={styles.cell}>Diagnóstico</DataTable.Title>
                  <DataTable.Title style={styles.cell}>Tratamiento</DataTable.Title>
                  <DataTable.Title numeric>Editar</DataTable.Title>

              </DataTable.Header>
              {listFichas.map((item,index)=>{
                  return <FichaClinicaItem key={index} motivoConsulta={item.motivoConsulta} idCliente={item.idCliente} 
                                          idEmpleado={item.idEmpleado} diagnostico={item.diagnostico} idTipoProducto={item.idTipoProducto}
                                           navigation={navigation} idFichaClinica={item.idFichaClinica}
                                          />
              })}
              
          </DataTable>     
      </ScrollView>
               
        <FAB
          style={styles.fab}
          icon="plus"
          onPress = {goTocreateFichaClinica}
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
    },
    titlesmall:{
        fontSize:15
    },
    containerinputs:{
      marginHorizontal:10,
      marginVertical:10
    },
    containeritem:{
        marginVertical:15
    }
  });