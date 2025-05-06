import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./pages/HomePage";
import UsersPage from "./pages/UsersPage";
import { BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator();
const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Users" component={UsersPage} />
    </Stack.Navigator>
  );
};
export default Routes;
