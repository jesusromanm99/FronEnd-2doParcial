import React from "react";
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	KeyboardAvoidingView,
	ImageBackground,
} from "react-native";
import { Button, TextInput, ThemeProvider, Title } from "react-native-paper";
import colors from "../res/colors";

export default function Login({ onLogin }) {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");


	const handleLogin = () => {
		if (email.value != "usuario2" || password.value != "admin") {
			alert("Usuario o contraseña incorrecta");
			return;
		}

		onLogin();
	};

	return (
		<ImageBackground
			source={require("../res/background_dot.png")}
			resizeMode="repeat"
			style={styles.background}
		>
			<KeyboardAvoidingView style={styles.container} enabled={false}>
				<Title>Bienvenido de vuelta.</Title>
				<TextInput
					label="Usuario"
					returnKeyType="next"
					value={email.value}
					onChangeText={(text) => setEmail({ value: text })}
					autoCapitalize="none"
					style={styles.input}
				/>
				<TextInput
					label="Contraseña"
					returnKeyType="done"
					value={password.value}
					onChangeText={(text) =>
						setPassword({ value: text, error: "" })
					}
					error={!!password.error}
					errorText={password.error}
					secureTextEntry
					style={styles.input}
				/>
				<View style={styles.forgotPassword}>
					<TouchableOpacity
						onPress={() =>
							alert("Como vas a olvidar tu pass? 'usuario2' 'admin'")
						}
					>
						<Text style={styles.forgot}>
							Olvidaste tu contraseña?
						</Text>
					</TouchableOpacity>
				</View>
				<Button mode="contained" onPress={handleLogin}>
					Login
				</Button>
				<View style={styles.row}>
					<Text>Aún no tienes una cuenta? </Text>
					<TouchableOpacity onPress={() => alert("otro dia!")}>
						<Text style={styles.link}>Registrate</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	forgotPassword: {
		width: "100%",
		alignItems: "flex-end",
		marginBottom: 24,
	},
	row: {
		flexDirection: "row",
		marginTop: 4,
	},
	forgot: {
		fontSize: 13,
		color: colors.secondary,
	},
	link: {
		fontWeight: "bold",
		color: colors.primary,
	},
	background: {
		flex: 1,
		width: "100%",
		backgroundColor: colors.surface,
	},
	container: {
		flex: 1,
		padding: 20,
		width: 340,
		maxWidth: 340,
		alignSelf: "center",
		// alignItems: "center",
		justifyContent: "center",
	},
	input: {
		marginTop: 4,
		color: colors.primary,
		backgroundColor: "white",
		borderColor: "gray",
		borderWidth: 0.5,
		// borderRadius: 5,
	},
});
