import React from "react";
import { TextInput, Button, Text } from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import DropDown from "react-native-paper-dropdown";
import {createFichaClinica,getUsersFromSystem,getUsers,getTipoProductos} from "../../libs/http";
import CustomDialog from "../../components/CustomDialog";

const CrearFichaClinica=({navigation,route})=>{

    /*States*/
    const [motivoConsulta,setMotivoConsulta]=React.useState('')
    const [diagnostico,setDiagnostico]=React.useState('')
    const [observacion,setObservacion]=React.useState('')
    const [idEmpleado,setIdEmpleado]=React.useState(1)
    const [idCliente,setIdCliente]=React.useState(1)
    const [idTipoProducto,setIdTipoProducto]=React.useState(1)
    const [showDropDownFisio, setShowDropDownFisio] = React.useState(false);
    const [showDropDownClient, setShowDropDownClient] = React.useState(false);
    const [showDropDownTipoProductos, setShowDropDownTipoProductos] = React.useState(false);
    const [clientOptions,setClientOptions]=React.useState([])
    const [fisioOptions,setFisioOptions]=React.useState([])
    const [tipoproductosOptions,setTipoProductosOptions]=React.useState([])
    
    //Dialog States
    const [showDialog,setShowDialog]=React.useState(false)
    const [titleDialog,setTitleDialog]=React.useState("")
    const [messageDialog,setMessageDialog]=React.useState("")

    /*Métodos*/
    const addFicha=async()=>{
        console.log(motivoConsulta,diagnostico,observacion,idEmpleado,idCliente,idTipoProducto)

        const {data,error}=await createFichaClinica(
            {
                motivoConsulta,
                diagnostico,
                observacion,
                idEmpleado,
                idCliente,
                idTipoProducto
            }
        )
        
        setShowDialog(true)
        if(data){
            setTitleDialog('Creado')
            setMessageDialog('La ficha clinica se creo exitosamente')
            
        }else {
            setTitleDialog('Error')
            setMessageDialog('La ficha clinica no pudo crearse, quiza cometio algun error al cargar los datos')
        }
    }
    
    const goBack=()=>{
        navigation.goBack()
    }

    /* Use Effect */

    /*Use Effect para inicializar la lista de fisioterapeutas */
    React.useEffect(async ()=>{
        const {data,error}= await getUsersFromSystem()
        if(data){
            setFisioOptions(data.lista.map(user => {
                return {
                    'label':`${user.nombre} ${user.apellido}`,
                    'value':`${user.idPersona}`
                }
            }));
            
        }
    },[])

    /* Use Effect para setear el fisioterapueta por defaul */
    React.useEffect(()=>{
        if(fisioOptions.length>0)setIdEmpleado(fisioOptions[0].value)
    },[fisioOptions])

     /*Use Effect para inicializar la lista de Clientes */
     React.useEffect(async ()=>{
        const {data,error}= await getUsers()
        
        if(data){
            setClientOptions(data.map(user => {
                return {
                    'label':`${user.nombre} ${user.apellido}`,
                    'value':`${user.idPersona}`
                }
            }));
        }
    },[])

     /*Use Effect para inicializar la lista de Productos */
     React.useEffect(async ()=>{
        const {data,error}= await getTipoProductos()
        
        if(data){
            setTipoProductosOptions(data.lista.map(tipoproducto => {
                return {
                    'label':`${tipoproducto.descripcion}`,
                    'value':`${tipoproducto.idTipoProducto}`
                }
            }));
        }
    },[])

    return(
        <ScrollView style={styles.container}>
            
            <Text style={[styles.containeritem,styles.titlesmall]}> Paciente:</Text>
            <DropDown
                     label={"Cliente"}
                     mode={"outlined"}
                     visible={showDropDownClient}
                     showDropDown={() => setShowDropDownClient(true)}
                     onDismiss={() => setShowDropDownClient(false)}
                     value={idCliente}
                     setValue={setIdCliente}
                     list={clientOptions}
                     style={styles.containeritem}
            />
            
            <Text style={[styles.containeritem,styles.titlesmall]}> Fisioterapeuta:</Text>
            <DropDown
                     label={"Profesional"}
                     mode={"outlined"}
                     visible={showDropDownFisio}
                     showDropDown={() => setShowDropDownFisio(true)}
                     onDismiss={() => setShowDropDownFisio(false)}
                     value={idEmpleado}
                     setValue={setIdEmpleado}
                     list={fisioOptions}
                     style={styles.containeritem}
            />

            <Text style={[styles.containeritem,styles.titlesmall]}> Tratamiento:</Text>
            <DropDown
                     label={"Tratamiento"}
                     mode={"outlined"}
                     visible={showDropDownTipoProductos}
                     showDropDown={() => setShowDropDownTipoProductos(true)}
                     onDismiss={() => setShowDropDownTipoProductos(false)}
                     value={idTipoProducto}
                     setValue={setIdTipoProducto}
                     list={tipoproductosOptions}
                     style={styles.containeritem}
            />

            <TextInput
                style={styles.containeritem}
                mode="outlined"
                label="Motivo Consulta"
                value={motivoConsulta}
                onChangeText={text => setMotivoConsulta(text)}
            />

            <TextInput
                style={styles.containeritem}
                label="Diagnostico"
                mode="outlined"
                value={diagnostico}
                onChangeText={text => setDiagnostico(text)}
            />

            <TextInput
                style={styles.containeritem}
                mode="outlined"
                label="Observacion"
                value={observacion}
                onChangeText={text => setObservacion(text)}
            />
            
            <Button mode="contained" onPress={addFicha}>Crear Ficha</Button>
            { showDialog && <CustomDialog title={titleDialog} message={messageDialog} 
                            visible={showDialog} setVisible={setShowDialog}
                            action={goBack}
                            />}
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    container:{
        marginHorizontal:10,
        marginVertical:10
    },
    title:{
        fontSize:23
    },
    titlesmall:{
        fontSize:15
    },
    containeritem:{
        marginVertical:15
    }
}) 
export default CrearFichaClinica