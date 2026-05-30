import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      Alert.alert("Uspjeh", "Korisnik je registriran!");

      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Greška", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>

      <Text style={styles.subtitle}>
        Kreiraj svoj račun
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        placeholder="Lozinka"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={handleRegister}
      >
        <Text style={styles.primaryButtonText}>
          Registriraj se
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.secondaryButtonText}>
          Već imam račun
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff0f5",
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    textAlign: "center",
    color: "#d63384",
    marginBottom: 8,
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 30,
    fontSize: 16,
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 15,

    shadowColor: "#d63384",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  primaryButton: {
    backgroundColor: "#d63384",
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 5,
  },

  primaryButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  secondaryButton: {
    marginTop: 18,
    alignItems: "center",
  },

  secondaryButtonText: {
    color: "#d63384",
    fontWeight: "600",
  },
});