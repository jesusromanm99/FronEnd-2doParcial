import React from "react";
import { Text,StyleSheet } from "react-native";
import { FAB } from 'react-native-paper';
import { getAllFicha } from "../../libs/http";
export default function Ficha({navigation,route}){

    /*States */
    const [listFichas,setListFichas]=React.useState([])

    const goToCreateFicha=()=>{
        navigation.navigate('CrearFicha',{'ejemplo':'ejemploParametro'})
    }
    /*Methods */
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
          <Text style={styles.container}>Ficha</Text>
          <FAB
            style={styles.fab}
            
            icon="plus"
            onPress={goToCreateFicha}
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
  });