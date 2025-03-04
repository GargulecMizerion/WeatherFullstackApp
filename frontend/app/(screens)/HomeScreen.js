import { useEffect, useState } from "react";
import axios from "axios";
import {FlatList, View, Text, Dimensions, ScrollView, TextInput} from "react-native";
import {LineChart} from "react-native-chart-kit";
import {SafeAreaView} from "react-native-safe-area-context";

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [temperature, setTemperature] = useState([]);
    const [cityName, setCityName] = useState("");

    const parseDate = (dt) => {
        const date = new Date(dt*1000);

        const formattedDateTime = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;

        return formattedDateTime;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://10.0.2.2:8080/?city=Warszawa');
                setData(response.data || []); // Zapobieganie błędom, jeśli `response.data` jest `null`

               setLabels(response.data.map((item) => parseDate(item.dt)));
               setTemperature(response.data.map((item) => item.main.temp));
            } catch (error) {
                console.error("Błąd pobierania danych:", error);
            }
        };

        fetchData();
    }, []);

    const getToday = () => {
        const today = new Date();

        const dayName = today.toLocaleDateString('pl-PL', { weekday: 'long' });

        return dayName.charAt(0).toUpperCase() + dayName.slice(1);
    }

    const getDate = () => {
        const today = new Date();

        return today.toLocaleDateString('pl-PL');
    }

    return (
        <SafeAreaView className={"bg-primary h-full"}>
        <View className={"mt-5 ml-2"}>
            <Text className={"text-center text-4xl "}> Dziś jest <Text className={"text-sea font-bold"}>{getToday()}</Text>,</Text>
            <Text className={"text-center text-3xl"}> {getDate()}</Text>
            <TextInput  color={"white"} className={"bg-sea mr-2 p-2"} borderRadius={5}/>
            {data.length === 0 ? (
                <Text className={"text-4xl"}>Ładowanie danych...</Text>
            ) : (
                <ScrollView horizontal={true}>

                    <LineChart
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    data: temperature,
                                }
                            ]
                        }}
                        width={Math.max(800, labels.length * 150)} // from react-native
                        height={220}

                        yAxisSuffix="°C"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#e26a00",
                            backgroundGradientFrom: "#fb8c00",
                            backgroundGradientTo: "#ffa726",
                            decimalPlaces: 1, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,

                            borderRadius: 16
                        }}
                    />

                </ScrollView>
            )}
        </View>
        </SafeAreaView>
    );
};

export default HomeScreen;
