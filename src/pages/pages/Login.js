import React from "react";
import { Text,StyleSheet } from "react-native";

export default function Login(){
    return(
        <Text style={styles.container}>Login</Text>
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