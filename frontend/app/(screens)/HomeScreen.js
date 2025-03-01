import { useEffect, useState } from "react";
import axios from "axios";
import {FlatList, View, Text, Dimensions, ScrollView} from "react-native";
import {LineChart} from "react-native-chart-kit";

const HomeScreen = () => {
    const [data, setData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [temperature, setTemperature] = useState([]);

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

    return (
        <View>
            {data.length === 0 ? (
                <Text>Ładowanie danych...</Text>
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
    );
};

export default HomeScreen;
