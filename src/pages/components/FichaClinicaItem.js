import React from "react";
import { DataTable, Portal, Modal, Text, Button, Title } from "react-native-paper";
import { StyleSheet } from "react-native";
import { Ionicons,AntDesign } from '@expo/vector-icons';
import colors from "../res/colors";

const FichaClinicaItem=({idFichaClinica,motivoConsulta,idCliente,idEmpleado,diagnostico,idTipoProducto,fechaHora,observacion,navigation})=>{
    const goToEditFichaClinica=()=>{
        navigation.navigate('EditarFichaClinica',{idFichaClinica})
    } 

    /*Modal */
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', padding: 20};

    return(
        <>
       
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Title style={styles.titulo}>Ficha Clinica {idFichaClinica}</Title>
                    <Text style={styles.label}>Creación: </Text><Text style={styles.texto}>{fechaHora}</Text>
                    <Text style={styles.label}>Fisioterapeuta: </Text><Text style={styles.texto}>{idEmpleado.nombre}</Text>
                    <Text style={styles.label}>Paciente: </Text><Text style={styles.texto}>{idCliente.nombre}</Text>
                    <Text style={styles.label}>Motivo Consulta: </Text><Text style={styles.texto}>{motivoConsulta}</Text>
                    <Text style={styles.label}>Diagnóstico: </Text><Text style={styles.texto}>{diagnostico}</Text>
                    <Text style={styles.label}>Tratamiento: </Text><Text style={styles.texto}>{idTipoProducto.descripcion}</Text>
                    <Text style={styles.label}>observacion: </Text><Text style={styles.texto}>{observacion}</Text>
                    <Button mode="contained" style={styles.boton} onPress={goToEditFichaClinica} onTouchEnd={hideModal}>Editar Ficha</Button>
                </Modal>
            </Portal>

            <DataTable.Row>  
                            <DataTable.Cell  style={styles.cell}>{idEmpleado.nombre}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell} >{idCliente.nombre}</DataTable.Cell>
                            <DataTable.Cell  style={styles.cell}>{idTipoProducto.descripcion}</DataTable.Cell>
                            <DataTable.Cell onPress={showModal}><AntDesign  name="right" size={20} color={colors.primary}/></DataTable.Cell>
            </DataTable.Row>
        </>
    )
}
const styles = StyleSheet.create({
    cell:{
        flex:4,
    },
    titulo:{
        textAlign: 'center',
    },
    boton:{    
        marginTop:12,
        marginHorizontal:8,
    },
    label:{
        marginTop:7,
        fontWeight:'bold'
    },
    texto:{
        marginTop:4,
        fontSize:16
    }
  });
export default FichaClinicaItem;