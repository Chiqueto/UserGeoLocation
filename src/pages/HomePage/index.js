import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { s } from "./styles";
import MapView, { Marker } from "react-native-maps";
import useLocation from "../../hooks/useLocation";
import Ionicons from "@expo/vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Main() {
  const { coords, errorMsg } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [userId, setUserId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(false);
  const navigator = useNavigation();

  const getUsers = async () => {
    const users = await AsyncStorage.getItem("users");
    console.log(users);
    if (users) {
      setUsers(JSON.parse(users));
    } else {
      setUsers([]);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getUsers(); // recarrega os usuários sempre que voltar para a tela
    }, [])
  );

  useEffect(() => {
    getUsers();
  }, []);

  const newUser = async () => {
    setIsLoading(true);
    const { latitude, longitude } = await getCoordinates();

    const userId = users.length > 0 ? users[users.length - 1].id + 1 : 1;
    setUserId(userId + 1);

    const newUser = {
      id: userId,
      name: name,
      street: street,
      number: number,
      city: city,
      state: state,
      latitude: latitude,
      longitude: longitude,
    };

    setName("");
    setStreet("");
    setNumber("");
    setCity("");
    setState("");

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    setIsLoading(false);
    setIsMenuOpen(false);
    alert("usuário cadastrado com sucesso!");
  };

  const getCoordinates = async () => {
    const response = await Location.geocodeAsync(
      `${street}, ${number}, ${city}, ${state}`
    );

    if (response.length > 0) {
      return {
        latitude: response[0].latitude,
        longitude: response[0].longitude,
      };
    } else {
      alert("Endereço não encontrado");

      throw new Error("Endereço não encontrado");
    }
  };

  if (errorMsg) {
    return (
      <View style={s.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  if (!coords) {
    return (
      <View style={s.center}>
        <ActivityIndicator size="large" color="#3498DB" />
        <Text style={s.loadingText}>Carregando...</Text>
      </View>
    );
  }

  return (
    <>
      {!isMenuOpen && (
        <>
          <TouchableOpacity
            style={s.menuIcon}
            onPress={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Ionicons name="add" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={s.userIcon}
            onPress={() => navigator.navigate("Users")}
          >
            <Ionicons name="person" size={24} color="black" />
          </TouchableOpacity>
        </>
      )}

      {isMenuOpen && (
        <View style={s.menuOpened}>
          <View style={s.menuHeader}>
            <TouchableOpacity
              style={s.closeButton}
              onPress={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Ionicons name="close" size={24} color="red" />
            </TouchableOpacity>
            <Text style={s.title}>Cadastrar novo usuário</Text>
          </View>
          <TextInput
            style={s.input}
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
            placeholder="Nome"
          />
          <TextInput
            style={s.input}
            value={street}
            onChangeText={(text) => {
              setStreet(text);
            }}
            placeholder="Logradouro"
          />
          <TextInput
            style={s.input}
            value={number}
            keyboardType="numeric"
            onChangeText={(text) => {
              setNumber(text);
            }}
            placeholder="Número"
          />
          <TextInput
            style={s.input}
            value={city}
            onChangeText={(text) => {
              setCity(text);
            }}
            placeholder="Cidade"
          />
          <TextInput
            style={s.input}
            value={state}
            onChangeText={(text) => {
              setState(text);
            }}
            placeholder="Estado"
          />
          <TouchableOpacity
            style={[
              s.button,
              isLoading || !name || !street || !number || !city || !state
                ? { opacity: 0.5 }
                : null,
            ]}
            onPress={newUser}
            disabled={
              isLoading || !name || !street || !number || !city || !state
            }
          >
            {isLoading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={s.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      {selectedUser && (
        <View style={s.menuOpened}>
          <Text style={s.title}>Usuário selecionado</Text>
        </View>
      )}

      <MapView
        onPress={() => {
          if (isMenuOpen) setIsMenuOpen(false);
        }}
        style={isMenuOpen ? s.mapUnfocus : s.map}
        initialRegion={{
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.01,
        }}
        showsUserLocation={true}
        scrollEnabled={!isMenuOpen}
        zoomEnabled={!isMenuOpen}
        rotateEnabled={!isMenuOpen}
        pitchEnabled={!isMenuOpen}
      >
        <Marker
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
          }}
          title="Você está aqui"
          description="Localização atual"
        />
        {users.map((user) => (
          <Marker
            key={user.id}
            coordinate={{
              latitude: user.latitude,
              longitude: user.longitude,
            }}
            title={user.name}
            description={`${user.street}, ${user.number}, ${user.city}, ${user.state}`}
          />
        ))}
      </MapView>
    </>
  );
}
