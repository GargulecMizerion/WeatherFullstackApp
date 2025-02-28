import {Button} from "@react-navigation/elements";
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const WelcomeScreen = () => {
    const navigation = useNavigation();
    return <View>
        <Button onPress={() => navigation.navigate("Home") }>Przejdz do ...</Button>
    </View>
}

export default WelcomeScreen;