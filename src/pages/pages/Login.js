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

export default function Login({onLogin}) {

	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	return (
    <ImageBackground
      source={require('../res/background_dot.png')}
      resizeMode="repeat"
      style={styles.background}
      >
      <KeyboardAvoidingView style={styles.container} enabled={false}>
        <Title>Welcome back.</Title>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
          style={styles.input}
          />
        <View style={styles.forgotPassword}>
          <TouchableOpacity
            onPress={() => alert("como vas a olvidar tu pass? :|")}
          >
            <Text style={styles.forgot}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Button mode="contained" onPress={onLogin}>
          Login
        </Button>
        <View style={styles.row}>
          <Text>Don’t have an account? </Text>
          <TouchableOpacity
            onPress={() => alert("otro dia!")}
          >
            <Text style={styles.link}>Sign up</Text>
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
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 0.5,
    // borderRadius: 5,
  },
});
