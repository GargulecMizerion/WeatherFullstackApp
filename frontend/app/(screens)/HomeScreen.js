import { useEffect, useState } from "react";
import axios from "axios";
import { FlatList, View, Text } from "react-native";

const HomeScreen = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/?city=Warszawa');
                setData(response.data || []); // Zapobieganie błędom, jeśli `response.data` jest `null`
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
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.dt.toString()}
                    renderItem={({ item }) => <Text>{item.main.temp}°C</Text>}
                />
            )}
        </View>
    );
};

export default HomeScreen;
