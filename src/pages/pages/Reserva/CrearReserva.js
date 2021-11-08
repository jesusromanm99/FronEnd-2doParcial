import React from "react";
import { Button, Text,TextInput,Divider,Modal,Portal } from "react-native-paper";
import { createReservation,getScheduleClear,getUsersFromSystem,getUsers } from "../../libs/http";
import DropDown from "react-native-paper-dropdown";
import { ScrollView, StyleSheet,View } from "react-native";
import colors from "../../res/colors";
import DateTimePicker from '@react-native-community/datetimepicker';
import CustomDialog from "../../components/CustomDialog";
const CrearReserva=({navigation})=>{
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
    const [timeAvailable,setTimeAvailable]=React.useState([])
    const [timeSelected,setTimeSelected]=React.useState('')
    //Dialog States
    const [showDialog,setShowDialog]=React.useState(false)
    const [titleDialog,setTitleDialog]=React.useState("")
    const [messageDialog,setMessageDialog]=React.useState("")
    /*   variables temporables */
    

    

    /* Methods */
    const getScheduleFree=async()=>{
        console.log('AGENDALibre',fechaCadena,idEmpleado)
        const {data,error}=await getScheduleClear(idEmpleado,fechaCadena)
        if(data){
            console.log('data...AgendaLibre...',data)
            setTimeAvailable(data.map(item => {
                return {
                    'label':`${item.horaInicioCadena} - ${item.horaFinCadena}`,
                    'value':`${item.horaInicioCadena}-${item.horaFinCadena}`
                }
            }));
        } 
    }
    const goBack=()=>{
        navigation.goBack()
    }
    const addReservation=async()=>{
        console.log(fechaCadena,horaInicioCadena,horaFinCadena,idEmpleado,idCliente)
        
        const {data,error}=await createReservation(
            {
                fechaCadena,
                horaInicioCadena,
                horaFinCadena,
                idEmpleado,
                idCliente
            }
        )
        setShowDialog(true)
        if(data){
            setTitleDialog('Creado')
            setMessageDialog('La reserva se creo exitosamente')
            
        }else {
            setTitleDialog('Error')
            setMessageDialog('La reserva no pudo crearse, quiza cometio algun error al cargar los datos')
        }
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

    /*Use Effect para cuando la hora seleccionada */
    React.useEffect(()=>{
            const [horaInicio,horaFin]=timeSelected.split('-') 
            console.log(horaInicio,horaFin)
            setHoraInicioCadena(horaInicio)
            setHoraFinCadena(horaFin)
    },[timeSelected])

    return(
        <ScrollView style={styles.container}> 
            {/* Filtro de la Reserva */}
            <Text style={[styles.containeritem,styles.title]}> Obtener agenda:</Text>
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
            <Text style={styles.containeritem}>
                <Text style={{textDecorationLine:'underline',color:colors.primary,fontWeight: 'bold'}}  onPress={()=>setShowDate(true)}>Fecha de Reserva:</Text>
                <Text>{' '+fecha.toLocaleDateString()}</Text>
            </Text>             
            
           
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
            <Text style={[styles.containeritem,styles.title]}> Crear reserva:</Text>
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
                     list={timeAvailable}
                     style={styles.containeritem}
            />
              <TextInput
                label="Fecha"
                mode="outlined"
                value={fecha.toLocaleDateString()}
                blur
                style={styles.containeritem}
                disabled
            />
            <Button mode="contained" onPress={addReservation}>Crear Reserva</Button>
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
    containeritem:{
        marginVertical:15
    }
})
export default CrearReserva