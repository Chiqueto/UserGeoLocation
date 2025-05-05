import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "./pages/HomePage";

const Stack = createStackNavigator();
const Routes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default Routes;
