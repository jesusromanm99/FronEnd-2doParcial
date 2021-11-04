import React from "react";
import { Button, Text,TextInput,Divider,Modal,Portal } from "react-native-paper";
import { createReservation,getScheduleClear,getUsersFromSystem,getUsers } from "../../libs/http";
import DropDown from "react-native-paper-dropdown";
import { ScrollView, StyleSheet,View } from "react-native";
import colors from "../../res/colors";
import DateTimePicker from '@react-native-community/datetimepicker';

const CrearReserva=()=>{
    /* States */
    const [name,setName]=React.useState('Reserva')
    const [idEmpleado,setEmpleado]=React.useState('')
    const [idCliente,setIdCliente]=React.useState('')
    const [fechaCadena,setFechaCadena]=React.useState("20190903")
    const [fecha,setFecha]=React.useState(new Date())
    const [horaInicioCadena,setHoraInicioCadena]=React.useState('1000')
    const [horaFinCadena,setHoraFinCadena]=React.useState('1015')
    const [showDropDownFisio, setShowDropDownFisio] = React.useState(false);
    const [showDropDownClient, setShowDropDownClient] = React.useState(false);
    const [showDate,setShowDate]=React.useState(false)
    const [clientOptions,setClientOptions]=React.useState([])
    const [fisioOptions,setFisioOptions]=React.useState([])
    const [visible, setVisible] = React.useState(false);
    
    
    const [timeSelected,setTimeSelected]=React.useState('')
    /*   variables temporables */
    const addReservation=async()=>{
            const {data,error}=await createReservation(
                {
                    "fechaCadena": "20190903",
                    "horaInicioCadena":"1000",
                    "horaFinCadena":"1015",
                    "idEmpleado":3,
                    "idCliente":7
                }
            )
    }
    const containerStyle = {backgroundColor: 'white', padding: 10};
    const list=new Array(100).fill('1').map((_,index)=>{return {'label':index+'','value':index+''}});

    

    /* Methods */
    const getScheduleFree=async()=>{
        console.log('AGENDALibre',fechaCadena,idEmpleado)
        const {data,error}=await getScheduleClear(idEmpleado,fechaCadena)
        showModal()
    }
    const onChangeDate=(event, selectedDate) => {
        const d = selectedDate || fecha;
        setShowDate(false);
        setFecha(d);
        setFechaCadena(`${d.getFullYear()}${ ('0' + (d.getMonth() + 1)).slice(-2)}${('0' + d.getDate()).slice(-2)}`)
      };
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

    return(
        <ScrollView style={styles.container}> 

            <Text style={styles.containeritem}> Filtro:</Text>
            <DropDown
                     label={"Fisioterapeuta"}
                     mode={"outlined"}
                     visible={showDropDownFisio}
                     showDropDown={() => setShowDropDownFisio(true)}
                     onDismiss={() => setShowDropDownFisio(false)}
                     value={idEmpleado}
                     setValue={setEmpleado}
                     list={fisioOptions}
                     style={styles.containeritem}
            />             
            <Button
                labelStyle={{textDecorationLine:'underline'}}
                uppercase={false}
                onPress={()=>setShowDate(true)}
            >  Seleccionar una fecha</Button>
           
            {showDate && 
                <DateTimePicker
                
                value={fecha}
                mode="date"
                display="default"
                onChange={onChangeDate}
                textColor={colors.primary}
                
                 />
            }
            
            <Button  mode="contained" style={styles.containeritem}  onPress={getScheduleFree}>Obtener agenda Libre</Button>
             <Divider colors={colors.primary}/>
            
            {/* Crear Reserva*/}
            <Text style={styles.containeritem}> Crear Reserva:</Text>
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
            <DropDown
                     label={"Horarios Disponibles"}
                     mode={"outlined"}
                     visible={visible}
                     showDropDown={() => setVisible(true)}
                     onDismiss={() => setVisible(false)}
                     value={timeSelected}
                     setValue={setTimeSelected}
                     list={list}
                     style={styles.containeritem}
            />
              <TextInput
                label="Fecha"
                mode="outlined"
                value={fechaCadena}
                blur
                style={styles.containeritem}
            />
            <Button mode="contained" onPress={addReservation}>Crear Reserva</Button>
            
        </ScrollView>
    )
}
const styles=StyleSheet.create({
    container:{
        marginHorizontal:10,
        marginVertical:10
    },
    title:{
        fontSize:15
    },
    containeritem:{
        marginVertical:15
    }
})
export default CrearReserva