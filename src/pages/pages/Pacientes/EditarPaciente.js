import React, { useEffect, useState } from "react";
import {
	Button,
	TextInput,
	Divider,
} from "react-native-paper";
import {
    createPaciente, deletePaciente, getPaciente
} from "../../libs/http";
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import colors from "../../res/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
// import CustomDialog from "../../components/CustomDialog";
const editarPaciente = ({ route, navigation }) => {
	/* State */
	// nombre, apellido, teléfono, email, ruc, cedula, tipoPersona, fechaNacimiento
	const [state, setState] = useState({
		nombre:"",
		apellido:"",
		telefono:"",
		email:"",
		ruc:"",
		cedula:"",
		tipoPersona:"",
		fechaNacimiento: "",
	});
	const [showDate, setShowDate] = React.useState(false);

    const handleSaveButton = async () => {
		const removePaciente = async() => {
			const {res, error} = await deletePaciente(route.params.id);
			if (error) return false
			if (res) return true
		}
		const rmOk = await removePaciente()
		if(!rmOk){
			alert("No se puede editar el paciente");
			return;
		}else{
			console.log(">>>>>>>Paciente eliminado");
		}
		// wait 100ms 
		await new Promise(resolve => setTimeout(resolve, 100));
        const {data, error} = await createPaciente(state);
        if (error){
			alert("Error al crear el paciente"); 
			console.log(error);
		}
		if(data){
			alert("Paciente editado con éxito");
			navigation.goBack()
		}

    }

	const handleDatePicker = (e)=>{
		setShowDate(false);
		if (e.type === "set") {
			const date = new Date(e.nativeEvent.timestamp);
			setState({...state, fechaNacimiento:date.toLocaleDateString()});
		}
		console.log("date picker");
		console.log(e)
	}

	useEffect(async()=>{
		const id = route.params.id;
		console.log(id)
		const {data,error} = await getPaciente(id);
		if(error){
			alert("Error al obtener el paciente");
			console.log(error);
		}
		if (data){
			const date = new Date(data.fechaNacimiento);
			// add 12 hour to date
			date.setHours(date.getHours() + 12);
			data.fechaNacimiento = date.toLocaleDateString();
			let newState 
			Object.keys(state).forEach(key => {
				newState = {...newState, [key]:data[key]?data[key]:""}
			})
			console.log(newState)
			setState(newState);
		}

	},[])


	return (
		<ScrollView style={styles.container}>
			{/* Filtro de la Reserva */}
			{/* <Text style={[styles.containeritem,styles.title]}> Obtener agenda:</Text> */}
			<TextInput
				mode="outlined"
				label="Nombre"
				value={state.nombre}
				onChangeText={(text) => setState({ ...state, nombre: text })}
				style={styles.space}
			/>
			<TextInput
				mode="outlined"
				label="Apellido"
				value={state.apellido}
				onChangeText={(text) => setState({ ...state, apellido: text })}
				style={styles.space}
			/>
			<TextInput
				mode="outlined"
				label="Telefono"
				value={state.telefono}
				onChangeText={(text) => setState({ ...state, telefono: text })}
				style={styles.space}
				keyboardType='number-pad'
			/>
			<TextInput
				mode="outlined"
				label="Cedula"
				value={state.cedula}
				onChangeText={(text) => setState({ ...state, cedula: text })}
				style={styles.space}
				keyboardType="numeric"
			/>
			<TextInput
				mode="outlined"
				label="Correo Electronico"
				value={state.email}
				onChangeText={(text) => setState({ ...state, email: text })}
				style={styles.space}
				keyboardType="email-address"
			/>
			<TextInput
				mode="outlined"
				label="Ruc"
				keyboardType="numeric"
				value={state.ruc}
				onChangeText={(text) => setState({ ...state, ruc: text })}
				style={styles.space}
			/>
			<TextInput
				mode="outlined"
				label="Fecha de Nacimiento"
				value={state.fechaNacimiento}
				onChangeText={(text) => setState({ ...state, fechaNacimiento: text })}
				style={styles.space}
				showSoftInputOnFocus={false}
				onFocus={() => { setShowDate(true); Keyboard.dismiss() }}
			/>

			<Button
				mode="contained"
				style={styles.containeritem}
				onPress={handleSaveButton}
			>
				Guardar Paciente
			</Button>
			<Divider colors={colors.primary} />
			{   showDate &&
                    <DateTimePicker
						value={
							state.fechaNacimiento
								? new Date(state.fechaNacimiento)
								: new Date()
						}
						mode="date"
						display="default"
						onChange={handleDatePicker}
						textColor={colors.primary}
                    />
                }
		</ScrollView>
	);
};


const styles = StyleSheet.create({
	container: {
		marginHorizontal: 10,
		marginVertical: 10,
	},
	title: {
		fontSize: 23,
	},
	containeritem: {
		marginVertical: 15,
	},
});
export default editarPaciente;
