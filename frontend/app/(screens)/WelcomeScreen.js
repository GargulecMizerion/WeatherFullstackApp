import {Button} from "@react-navigation/elements";
import {View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const WelcomeScreen = () => {
    const navigation = useNavigation();
    return <View className="flex-1 bg-amber-600">
        <Button className={"bg-black"} onPress={() => navigation.navigate("Home") }>Przejdz do ...</Button>
    </View>
}

export default WelcomeScreen;