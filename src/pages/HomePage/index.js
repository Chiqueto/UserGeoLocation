import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../../hooks/useLocation";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Main() {
  const { coords, errorMsg } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!coords) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498DB" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <>
      <TouchableOpacity style={styles.menuIcon}>
        <Ionicons name="add" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.menuOpened}>
        <View srtle={styles.menuHeader}>
          <TouchableOpacity>
            <Ionicons
              name="close"
              size={24}
              color="red"
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            />
          </TouchableOpacity>
          <Text style={styles.title}>Cadastrar novo usuário</Text>
        </View>
        <TextInput style={styles.input} placeholder="Nome" />
        <TextInput style={styles.input} placeholder="Rua" />
        <TextInput style={styles.input} placeholder="Número" />
        <TextInput style={styles.input} placeholder="Cidade" />
        <TextInput style={styles.input} placeholder="Estado" />
        <TouchableOpacity
          style={styles.button}
          onPress={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          title="Você está aqui"
          description="Localização atual"
        />
      </MapView>
    </>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
  },
  menuIcon: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 1,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  menuOpened: {
    position: "absolute",
    width: "90%",
    top: 30,
    left: 25,
    zIndex: 1,
    backgroundColor: "white",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3498DB",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  menuHeader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
});
