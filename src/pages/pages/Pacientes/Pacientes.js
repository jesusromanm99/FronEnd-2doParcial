import React, { useEffect, useState } from "react";

import { Text, StyleSheet, View, ScrollView } from "react-native";
import {
	Button,
	DataTable,
	Searchbar,
	TextInput,
	Divider,
	Paper,
  Checkbox,
  Chip,
} from "react-native-paper";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import colors from "../../res/colors";
import { FAB } from "react-native-paper";
import { getPacientes } from "../../libs/http";

export default function Pacientes() {
	const [nombre, setNombre] = React.useState("");
	const [apellido, setApellido] = React.useState("");
  const [data, setData] = React.useState([]); 
  
  const [colors, setColors] = useState({
    value: '',
    list: [
      { _id: '1', value: 'BLUE' },
      { _id: '2', value: 'RED' },
      { _id: '3', value: 'GREEN' },
      { _id: '4', value: 'YELLOW' },
    ],
    selectedList: [],
    error: '',
  });
  
  useEffect(() => {
    getPacientes().then((res) => {
      setData(res.data)
    })
  }, [])

  const handleFilter = () => {
    getPacientes(nombre, apellido).then((res) => {
      setData(res.data)
    })
  }

	return (
		<View style={styles.container}>
			<Text style={[styles.space, styles.title]}>Filtrar Paciente:</Text>
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
				<Button
					mode="contained"
					onPress={handleFilter}
				>
					Filtrar
				</Button>
				<Button
					mode="contained"
					// onPress={filterReservation}
					color={colors.secondary}
				>
					Ocultar filtros
				</Button>
			</View>

			<Divider style={styles.space} colors={colors.primary} />
      <ScrollView>
        <DataTable style={{ marginLeft: 0 }}>
          <DataTable.Header>
            <DataTable.Title style={styles.cell}>
              Nombre
            </DataTable.Title>
            <DataTable.Title style={styles.cell}>
              Apellido
            </DataTable.Title>
            <DataTable.Title style={styles.cell}>
              Cedula
            </DataTable.Title>
            <DataTable.Title style={styles.cell}>
              Fec. Nac.
            </DataTable.Title>
            <DataTable.Title numeric>Opc.</DataTable.Title>
          </DataTable.Header>

          {data ? data.map(item => {
              return  <DataTable.Row>
              <DataTable.Cell style={styles.cell}>{item.nombre}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.apellido}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.cedula}</DataTable.Cell>
              <DataTable.Cell style={styles.cell}>{item.fechaNacimiento}</DataTable.Cell>
              <DataTable.Cell numeric>
                {/* <DataTable.Cell numeric onPress={goToEditReservation}> */}
                <AntDesign
                  name="edit"
                  size={20}
                  color={colors.primary}
                />
                </DataTable.Cell>
                </DataTable.Row>
              }): null}
              
        </DataTable>
      </ScrollView>

			<FAB
				style={styles.fab}
				icon="plus"
				// onPress={goToCreateReservation}
				// onPress={goToCreateReservation}
			/>
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
