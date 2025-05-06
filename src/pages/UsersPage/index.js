import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [editingUserId, setEditingUserId] = useState(null);
  const [name, setName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const stored = await AsyncStorage.getItem("users");
    setUsers(stored ? JSON.parse(stored) : []);
    setIsLoading(false);
  };

  const saveUsers = async (updatedUsers) => {
    await AsyncStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setName(user.name);
    setStreet(user.street);
    setNumber(user.number);
    setCity(user.city);
    setState(user.state);
  };

  const handleDelete = (id) => {
    Alert.alert("Confirmação", "Deseja excluir este usuário?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          const updated = users.filter((u) => u.id !== id);
          await saveUsers(updated);
        },
      },
    ]);
  };

  const handleSave = async () => {
    if (!name || !street || !number || !city || !state) {
      return Alert.alert("Erro", "Preencha todos os campos.");
    }

    // Faz a geocodificação do endereço
    const addressString = `${street}, ${number}, ${city}, ${state}`;
    const geo = await Location.geocodeAsync(addressString);

    if (geo.length === 0) {
      return Alert.alert("Erro", "Endereço não encontrado.");
    }

    const { latitude, longitude } = geo[0];

    const updatedUser = {
      id:
        editingUserId ??
        (users.length > 0 ? users[users.length - 1].id + 1 : 1),
      name,
      street,
      number,
      city,
      state,
      latitude,
      longitude,
    };

    let updated;
    if (editingUserId) {
      updated = users.map((u) => (u.id === editingUserId ? updatedUser : u));
    } else {
      updated = [...users, updatedUser];
    }

    await saveUsers(updated);

    // limpar
    setEditingUserId(null);
    setName("");
    setStreet("");
    setNumber("");
    setCity("");
    setState("");
  };

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{`${item.street}, ${item.number} - ${item.city}/${item.state}`}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => handleEdit(item)}
          style={styles.editBtn}
        >
          <Text style={styles.editText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          style={styles.deleteBtn}
        >
          <Text style={styles.deleteText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#3498DB" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {editingUserId ? "Editar usuário" : "Novo usuário"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Rua"
        value={street}
        onChangeText={setStreet}
      />
      <TextInput
        style={styles.input}
        placeholder="Número"
        value={number}
        onChangeText={setNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Cidade"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Estado"
        value={state}
        onChangeText={setState}
      />
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>
          {editingUserId ? "Salvar alterações" : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Usuários cadastrados</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderUser}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  saveBtn: {
    backgroundColor: "#3498DB",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 16 },
  userCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontWeight: "bold", fontSize: 16 },
  actions: {
    flexDirection: "row",
    marginTop: 8,
    justifyContent: "flex-end",
  },
  editBtn: {
    marginRight: 10,
  },
  deleteBtn: {},
  editText: { color: "#3498DB" },
  deleteText: { color: "#e74c3c" },
});
