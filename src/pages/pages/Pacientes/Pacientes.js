"user strict";
import React, { useEffect, useState } from "react";

import {
	Text,
	StyleSheet,
	View,
	ScrollView,
	ToastAndroid,
	Keyboard,
} from "react-native";
import { Button, DataTable, TextInput, Divider } from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import colors from "../../res/colors";
import { FAB } from "react-native-paper";
import { getPacientes, deletePaciente } from "../../libs/http";

export default function pacientes({ navigation }) {
	const [nombre, setNombre] = React.useState("");
	const [apellido, setApellido] = React.useState("");
	const [data, setData] = React.useState([]);
	const [hide, setHide] = React.useState(false);

	useEffect(() => {
		getPacientes().then((res) => {
			setData(res.data);
		});
		const willFocusSubscription = navigation.addListener("focus", () => {
			getPacientes().then((res) => {
				setData(res.data);
			});
		});

		return willFocusSubscription;
	}, []);

	const handleFilter = () => {
		Keyboard.dismiss();
		getPacientes(nombre, apellido).then((res) => {
			setData(res.data);
		});
	};

	const [sort, setSort] = useState({ desc: true, column: ""});
	const handleSort = (sortBy) => {
		setSort({ desc: !sort.desc, column: sortBy });
		const sortedData = data.sort((a, b) => {
			if (sort.desc) {
				return b[sortBy] > a[sortBy] ? 1 : -1;
			} else {
				return a[sortBy] > b[sortBy] ? 1 : -1;
			}
		});
		// console.log(sortedData.map((x) => x.tipoPersona));
		setData([...sortedData]);
	};

	const handleFabPress = () => {
		navigation.navigate("CrearPaciente");
	};

	const handleDelete = async (index) => {
		const paciente = data[index];
		// console.log(JSON.stringify(paciente));
		// console.log("try to delete", paciente.idPersona);
		const { res, error } = await deletePaciente(paciente.idPersona);
		if (res) {
			// console.log("deleted");
			const newData = data.filter(
				(x) => x.idPersona !== paciente.idPersona
			);
			setData(newData);
			ToastAndroid.show("Paciente eliminado", ToastAndroid.SHORT);
		}
		if (error) {
			alert("error al borrar!");
			// console.log(error);
		}
	};

	const handleRecargar = () => {
		getPacientes().then((res) => {
			setData(res.data);
			ToastAndroid.show("Pacientes actualizados", ToastAndroid.SHORT);
		});
	};

	return (
		<View style={styles.container}>
			{hide ? (
				<View>
					<Text style={[styles.space, styles.title]}>
						Filtrar Paciente:
					</Text>
					<TextInput
						mode="outlined"
						label="Nombre"
						value={nombre}
						onChangeText={(text) => setNombre(text)}
						style={styles.space}
					/>
					<TextInput
						mode="outlined"
						label="Apellido"
						value={apellido}
						onChangeText={(text) => setApellido(text)}
						style={styles.space}
					/>

					<View style={styles.col2}>
						<Button mode="contained" onPress={handleFilter}>
							Filtrar
						</Button>
						<Button
							mode="contained"
							onPress={(_) => setHide(!hide)}
							color={colors.secondary}
						>
							Ocultar filtros
						</Button>
					</View>
				</View>
			) : (
				<View style={styles.col2}>
					<Button mode="contained" onPress={handleRecargar}>
						Recargar
					</Button>
					<Button
						mode="contained"
						onPress={(_) => setHide(!hide)}
						color={colors.secondary}
					>
						Mostrar filtros
					</Button>
				</View>
			)}

			<Divider style={styles.space} colors={colors.primary} />
			<DataTable style={{ marginLeft: 0 }}>
				<DataTable.Header>
					<DataTable.Title id="nombre"
						style={styles.cell}
						onPress={(_) => handleSort("nombre")}
						sortDirection={
							sort.column === "nombre"
								? sort.desc
									? "descencing"
									: "ascending"
								: null
						}
					>
						Nombre
					</DataTable.Title>
					<DataTable.Title id="apellido"
						style={styles.cell}
						onPress={(_) => handleSort("apellido")}
						sortDirection={
							sort.column === "apellido"
								? sort.desc
									? "descencing"
									: "ascending"
								: null
						}
					>
						Apellido
					</DataTable.Title>
					<DataTable.Title id="cedula" style={styles.cell}
						onPress={(_) => handleSort("cedula")}
						sortDirection={
							sort.column === "cedula"
								? sort.desc
									? "descencing"
									: "ascending"
								: null
						}>
						Cedula
					</DataTable.Title>
					<DataTable.Title id="fechaNacimiento" style={styles.cell}
						onPress={(_) => handleSort("fechaNacimiento")}
						sortDirection={
							sort.column === "fechaNacimiento"
								? sort.desc
									? "descencing"
									: "ascending"
								: null
						}>
						Fec. Nac.
					</DataTable.Title>
					<DataTable.Title style={{ flex: 2 }}>
						Opciones
					</DataTable.Title>
				</DataTable.Header>
			</DataTable>
			<ScrollView>
				<DataTable style={{ marginLeft: 0 }}>
					{data
						? data.map((item, index) => {
								return (
									<DataTable.Row key={index}>
										<DataTable.Cell style={styles.cell}>
											{item.nombre}
										</DataTable.Cell>
										<DataTable.Cell style={styles.cell}>
											{item.apellido}
										</DataTable.Cell>
										<DataTable.Cell style={styles.cell}>
											{item.cedula}
										</DataTable.Cell>
										<DataTable.Cell style={styles.cell}>
											{item.fechaNacimiento}
										</DataTable.Cell>
										<DataTable.Cell
											style={{
												alignItems: "center",
												justifyContent: "center",
											}}
											onPress={(_) =>
												navigation.navigate(
													"EditarPaciente",
													{
														id: data[index]
															.idPersona,
													}
												)
											}
										>
											<AntDesign
												name="edit"
												size={20}
												color={colors.primary}
											/>
										</DataTable.Cell>
										<DataTable.Cell
											style={{
												alignItems: "center",
												justifyContent: "center",
											}}
											onPress={(_) => handleDelete(index)}
										>
											<AntDesign
												name="delete"
												size={20}
												color={colors.primary}
											/>
										</DataTable.Cell>
									</DataTable.Row>
								);
						  })
						: null}
				</DataTable>
			</ScrollView>

			<FAB style={styles.fab} icon="plus" onPress={handleFabPress} />
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 8,
		backgroundColor: "#fff",
		// alignItems: "center",
		// justifyContent: "center",
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
	},
	cell: {
		flex: 2,
	},
	space: {
		marginTop: 10,
		marginHorizontal: 8,
	},
	title: {
		fontSize: 23,
	},
	col2: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		marginTop: 10,
		marginHorizontal: 8,
	},
});
