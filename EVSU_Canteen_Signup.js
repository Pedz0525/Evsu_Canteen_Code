import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function EVSU_Canteen_Signup({ navigation }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(
    "Checking connection..."
  );

  const checkConnection = async () => {
    try {
      console.log("Checking connection...");
      const response = await fetch("http://192.168.254.110:3000/status");
      const data = await response.json();
      console.log("Connection response:", data);
      setConnectionStatus("Connected to server ✅");
    } catch (error) {
      console.log("Connection error:", error);
      setConnectionStatus("Not connected to server ❌");
    }
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, []);
  const handleSignUp = async () => {
    if (!name || !username || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://192.168.254.110:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("Signup response:", data);

      if (data.success) {
        Alert.alert("Success", "Account created successfully", [
          {
            text: "OK",
            onPress: () => navigation.navigate("Login"),
          },
        ]);
      } else {
        Alert.alert("Error", data.message || "Failed to create account");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert(
        "Error",
        "Could not connect to server. Please check your connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("./assets/bg_img.png")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.headerText}>REGISTRATION</Text>
          <Text style={styles.connectionStatus}>{connectionStatus}</Text>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <Button
            title={loading ? "Creating Account..." : "Sign Up"}
            onPress={handleSignUp}
            color="#ff4c4c"
            disabled={loading}
          />
          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? Login here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 10,
    margin: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  form: {
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  loginLinkText: {
    color: "#007AFF",
    fontSize: 14,
  },
  connectionStatus: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 12,
    color: "#666",
  },
});
