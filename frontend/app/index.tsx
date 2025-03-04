import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "@/app/(screens)/WelcomeScreen";
import HomeScreen from "@/app/(screens)/HomeScreen";
import {SafeAreaProvider} from "react-native-safe-area-context";
import "../global.css"
import {StatusBar} from "expo-status-bar";

const Stack = createNativeStackNavigator();

export default function Index() {
    return (
        <SafeAreaProvider>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
            <StatusBar  backgroundColor={"#FDFAE9"}/>
        </SafeAreaProvider>

    );
}
