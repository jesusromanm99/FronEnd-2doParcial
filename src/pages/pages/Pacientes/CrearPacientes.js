import React, { useEffect, useState } from "react";
import {
	Button,
	Text,
	TextInput,
	Divider,
	Modal,
	Portal,
} from "react-native-paper";
import {
	createReservation,
	getScheduleClear,
	getUsersFromSystem,
	getUsers,
    createPaciente
} from "../../libs/http";
import DropDown from "react-native-paper-dropdown";
import { Keyboard, ScrollView, StyleSheet, View } from "react-native";
import colors from "../../res/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
// import CustomDialog from "../../components/CustomDialog";
const crearPaciente = ({ navigation }) => {
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
		fechaNacimiento: new Date(),
	});
	const [showDate, setShowDate] = React.useState(false);

    const handleCreatePaciente = async () => {
        const {data, error} = await createPaciente(state)
        if (error){
			alert("Error al crear el paciente"); 
			console.log(error);
		}
		if(data){
			alert("Paciente creado con éxito");

		}

    }
	const handleDatePicker = (e)=>{
		setShowDate(false);
		const date = new Date(e.nativeEvent.timestamp);
		setState({...state, fechaNacimiento:date.toLocaleDateString()});
		console.log("date picker");
		console.log(e)

	}













	const [idEmpleado, setEmpleado] = React.useState("");
	const [idCliente, setIdCliente] = React.useState("");
	const [fechaCadena, setFechaCadena] = React.useState("20190903");
	const [fecha, setFecha] = React.useState(new Date());
	const [horaInicioCadena, setHoraInicioCadena] = React.useState("1000");
	const [horaFinCadena, setHoraFinCadena] = React.useState("1015");
	const [showDropDownFisio, setShowDropDownFisio] = React.useState(false);
	const [showDropDownClient, setShowDropDownClient] = React.useState(false);
	const [clientOptions, setClientOptions] = React.useState([]);
	const [fisioOptions, setFisioOptions] = React.useState([]);
	const [visible, setVisible] = React.useState(false);
	const [timeAvailable, setTimeAvailable] = React.useState([]);
	const [timeSelected, setTimeSelected] = React.useState("");
	//Dialog States
	const [showDialog, setShowDialog] = React.useState(false);
	const [titleDialog, setTitleDialog] = React.useState("");
	const [messageDialog, setMessageDialog] = React.useState("");
	/*   variables temporables */

	/* Methods */
	const getScheduleFree = async () => {
		console.log("AGENDALibre", fechaCadena, idEmpleado);
		const { data, error } = await getScheduleClear(idEmpleado, fechaCadena);
		if (data) {
			console.log("data...AgendaLibre...", data);
			setTimeAvailable(
				data.map((item) => {
					return {
						label: `${item.horaInicioCadena} - ${item.horaFinCadena}`,
						value: `${item.horaInicioCadena}-${item.horaFinCadena}`,
					};
				})
			);
		}
	};
	const goBack = () => {
		navigation.goBack();
	};
	const addReservation = async () => {
		console.log(
			fechaCadena,
			horaInicioCadena,
			horaFinCadena,
			idEmpleado,
			idCliente
		);

		const { data, error } = await createReservation({
			fechaCadena,
			horaInicioCadena,
			horaFinCadena,
			idEmpleado,
			idCliente,
		});
		setShowDialog(true);
		if (data) {
			setTitleDialog("Creado");
			setMessageDialog("La reserva se creo exitosamente");
		} else {
			setTitleDialog("Error");
			setMessageDialog(
				"La reserva no pudo crearse, quiza cometio algun error al cargar los datos"
			);
		}
	};

	const onChangeDate = (event, selectedDate) => {
		const d = selectedDate || fecha;
		setShowDate(false);
		setFecha(d);
		setFechaCadena(
			`${d.getFullYear()}${("0" + (d.getMonth() + 1)).slice(-2)}${(
				"0" + d.getDate()
			).slice(-2)}`
		);
	};
	/* Use Effect */

	/*Use Effect para inicializar la lista de fisioterapeutas */
	React.useEffect(async () => {
		const { data, error } = await getUsersFromSystem();
		if (data) {
			setFisioOptions(
				data.lista.map((user) => {
					return {
						label: `${user.nombre} ${user.apellido}`,
						value: `${user.idPersona}`,
					};
				})
			);
		}
	}, []);

	/* Use Effect para setear el fisioterapueta por defaul */
	React.useEffect(() => {
		if (fisioOptions.length > 0) setEmpleado(fisioOptions[0].value);
	}, [fisioOptions]);

	/*Use Effect para inicializar la lista de Clientes */
	React.useEffect(async () => {
		const { data, error } = await getUsers();

		if (data) {
			setClientOptions(
				data.map((user) => {
					return {
						label: `${user.nombre} ${user.apellido}`,
						value: `${user.idPersona}`,
					};
				})
			);
		}
	}, []);

	/*Use Effect para cuando la hora seleccionada */
	React.useEffect(() => {
		const [horaInicio, horaFin] = timeSelected.split("-");
		console.log(horaInicio, horaFin);
		setHoraInicioCadena(horaInicio);
		setHoraFinCadena(horaFin);
	}, [timeSelected]);

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
				onPress={handleCreatePaciente}
			>
				Crear Paciente
			</Button>
			<Divider colors={colors.primary} />
			{   showDate &&
                    <DateTimePicker
						value={new Date() }
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
export default crearPaciente;
