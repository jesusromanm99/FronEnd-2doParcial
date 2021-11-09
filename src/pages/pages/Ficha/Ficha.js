import React from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { FAB, Text, DataTable } from "react-native-paper";
import FichaClinicaItem from "../../components/FichaClinicaItem";
import { getAllFicha } from "../../libs/http";

export default function Ficha({navigation}){
  
  /*States */
  const [listFichas,setListFichas]=React.useState([])

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(async() => {
      setRefreshing(true);
      await getFichaFromServer()
      setRefreshing(false)
  }, []);

  /* Métodos */
  const goTocreateFichaClinica=()=>{
    navigation.navigate('CrearFichaClinica')
  }

  const getFichaFromServer=async()=>{
    const {data,error}=await getAllFicha()
    if(data){
      setListFichas(data.lista)
    }
  }
  React.useEffect(()=>{
    getFichaFromServer()
  },[])
  
  return(
      <>
        <Text style={styles.container}>Ficha no carga</Text>

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
                                           navigation={navigation} idReserva={item.idReserva}
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