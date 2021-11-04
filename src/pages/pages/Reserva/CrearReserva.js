import React from "react";
import { Button, Text,TextInput,Divider } from "react-native-paper";
import { createReservation,getScheduleClear } from "../../libs/http";
import DropDown from "react-native-paper-dropdown";
import { StyleSheet,View } from "react-native";
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
    const FisioOptions=[
        {
            'label':'Jesus',
            'value':'1'
        },
        {
            'label':'Carlos',
            'value':'2'
        }
    ]

    const ClientOptions=[
        {
            'label':'Juan',
            'value':'1'
        },
        {
            'label':'Fer',
            'value':'2'
        }
    ]

    /* Methods */
    const getScheduleFree=async()=>{
        const {data,error}=await getScheduleClear(4,'20190903')
    }
    const onChangeDate=(event, selectedDate) => {
        const currentDate = selectedDate || fecha;
        setShowDate(false);
        setFecha(currentDate);
      };
    /* Use Effect */
    return(
        <View style={styles.container}> 
            <Text style={styles.containeritem}> Filtro:</Text>
            <DropDown
                     label={"Fisioterapeuta"}
                     mode={"outlined"}
                     visible={showDropDownFisio}
                     showDropDown={() => setShowDropDownFisio(true)}
                     onDismiss={() => setShowDropDownFisio(false)}
                     value={idEmpleado}
                     setValue={setEmpleado}
                     list={FisioOptions}
                     style={styles.containeritem}
            />
            <Button
                labelStyle={{textDecorationLine:'underline'}}
                uppercase={false}
                onPress={()=>setShowDate(true)}
            >  Seleccionar una fecha</Button>
           
            {showDate && 
                <DateTimePicker
                testID="dateTimePicker"
                value={fecha}
                mode="date"
                display="default"
                onChange={onChangeDate}
                 />
            }
            
            <Button  mode="contained" style={styles.containeritem}  onPress={getScheduleFree}>Obtener agenda Libre</Button>
             <Divider colors={colors.primary}/>
             <Text style={styles.containeritem}> Crear Reserva:</Text>
            <DropDown
                     label={"Cliente"}
                     mode={"outlined"}
                     visible={showDropDownClient}
                     showDropDown={() => setShowDropDownClient(true)}
                     onDismiss={() => setShowDropDownClient(false)}
                     value={idCliente}
                     setValue={setIdCliente}
                     list={ClientOptions}
                     style={styles.containeritem}
            />
            <Text style={styles.containeritem}> Fecha: {fechaCadena}</Text>
            <Text style={styles.containeritem}> Hora Inicio: {horaInicioCadena}</Text>
            <Text style={styles.containeritem}> Hora Fin: {horaFinCadena}</Text>
            <Button mode="contained" onPress={addReservation}>Crear Reserva</Button>
            
        </View>
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