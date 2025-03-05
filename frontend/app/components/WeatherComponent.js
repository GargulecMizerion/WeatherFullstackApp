import {View, Text, ScrollView, Image} from 'react-native'
import React from 'react'
import {LineChart} from "react-native-chart-kit";

const WeatherComponent = ({labels, temperature, current}) => {
    const img = current.weather[0].icon;

    return (
        <View>
            <View className={"flex-col items-center"} >
                <Image source={{ uri: `https://openweathermap.org/img/wn/${img}@2x.png` }} width={150} height={150} className={"align-middle"} />
            <Text className={"text-8xl color-sea text-center"}>{Math.round(current.main.temp)}°C</Text>

            </View>
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
                        marginRight: 5,
                        borderRadius: 16
                    }}
                />
            </ScrollView>
        </View>
    )
}
export default WeatherComponent
