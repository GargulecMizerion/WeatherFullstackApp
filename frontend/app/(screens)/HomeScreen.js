import { useEffect, useState } from "react";
import axios from "axios";
import {View, Text, ScrollView, TextInput, Platform} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {SafeAreaView} from "react-native-safe-area-context";
import {Button} from "@rneui/base";
import WeatherComponent from "@/app/components/WeatherComponent";


const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [temperature, setTemperature] = useState([]);
    const [cityName, setCityName] = useState("");
    const [inputFocus, setInputFocus] = useState("Podaj nazwę miasta...");

    const BASE_URL = Platform.OS === 'android' ? 'http://10.0.2.2:8080?city=': 'http://localhost:8080?city=';

    const parseDate = (dt) => {
        const date = new Date(dt*1000);
        const formattedDateTime = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
        return formattedDateTime;
    }

    const fetchData = async (city) => {
        try {
            const response = await axios.get(BASE_URL + city);
            setData(response.data || []); // Zapobieganie błędom, jeśli `response.data` jest `null`
            setLabels(response.data.map((item) => parseDate(item.dt)));
            setTemperature(response.data.map((item) => item.main.temp));
        } catch (error) {
            console.error("Błąd pobierania danych:", error);
        }
    };

    const getToday = () => {
        const today = new Date();
        const dayName = today.toLocaleDateString('pl-PL', { weekday: 'long' });
        return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    }

    const getDate = () => {
        const today = new Date();
        return today.toLocaleDateString('pl-PL');
    }

    const handleSearch = (city) => {
        fetchData(city);
    }

    return (
        <SafeAreaView className={"bg-primary h-full"}>
        <View className={"mt-5"}>
            <Text className={"text-center text-4xl mt-2"}> Dziś jest <Text className={"text-sea font-bold"}>{getToday()}</Text>,</Text>
            <Text className={"text-center text-3xl mt-2"}> {getDate()}</Text>
            <View className={"flex-row gap-2 m-2 items-center mt-4"} style={{ height: 50 }}>
                <TextInput
                    color={"white"}
                    className={"bg-sea p-2"}
                    borderRadius={100}
                    style={{
                        padding: 10,
                        fontSize: 16,
                        flexGrow: 1,
                        height: 50
                    }}
                    placeholder={inputFocus}
                    textAlign={"center"}
                    onFocus={() => setInputFocus("")}
                    onEndEditing={() => setInputFocus("Podaj nazwę miasta...")}
                    onChangeText={setCityName}
                />
                <Button
                    icon={{
                        name: 'search',
                        type: 'font-awesome',
                        size: 15,
                        color: 'white',
                    }}
                    buttonStyle={{
                        backgroundColor: 'rgba(90, 154, 230, 1)',
                        borderColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 25, // Połowa szerokości/wysokości dla idealnego koła
                        width: 50,
                        height: 50,
                        padding: 0, // Usuń nadmiarowe paddingi, aby zachować idealny kształt
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    containerStyle={{
                        width: 50,
                        height: 50,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                    }}
                    onPress={() => handleSearch(cityName)}
                />
            </View>
            {data.length === 0 ? (
                <Text className={"text-4xl"}>Wyszukaj swoje miasto</Text>
            ) : (

                  <WeatherComponent labels={labels} temperature={temperature} current={data[0]} />

            )}
        </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
