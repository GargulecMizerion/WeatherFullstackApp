import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {Button} from "@rneui/base";

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="h-full">
            <View className="bg-primary p-10 justify-center items-center h-full">
                <Text className="text-5xl text-sea font-bold top-20 z-10">
                    Typhoon
                </Text>
                <Image
                    source={require("../../assets/images/logo.png")}
                    className="w-4/5 m-0 h-1/2"
                    resizeMode={"contain"}
                />

                <Button
                    title="GET STARTED  "
                    size={"lg"}
                    radius={100}
                    titleStyle={{fontSize: 24}}
                    icon={{
                        name: 'play',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    iconRight={true}
                    onPress={() => navigation.navigate("Home")}
                    className={"rounded-3xl bg-black w-full p-5"}
                    color={"#026463"}
                />
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;
;