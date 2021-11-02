import React from "react";
import { Text,StyleSheet } from "react-native";

export default function Ficha(){
    return(
        <Text style={styles.container}>Ficha</Text>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });