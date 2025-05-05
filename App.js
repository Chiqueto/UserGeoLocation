import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import Routes from "./src/route";

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <Routes />
      </SafeAreaView>
    </NavigationContainer>
  );
}
