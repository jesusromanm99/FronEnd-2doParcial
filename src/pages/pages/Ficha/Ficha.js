import React from "react";
import { StyleSheet } from "react-native";
import { FAB, Text } from "react-native-paper";

export default function Ficha({navigation}){

  /* Métodos */
  const goTocreateFichaClinica=()=>{
    navigation.navigate('CrearFichaClinica')
  }

  return(
      <>
        <Text style={styles.container}>Ficha</Text>
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
  });