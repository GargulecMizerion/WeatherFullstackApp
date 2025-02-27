package com.kayman.backend.service;

import com.kayman.backend.model.FiveDaysResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    RestTemplate restTemplate = new RestTemplate();

    @Value("${api.key}")
    private String apiKey;



    public FiveDaysResponse getDailyWeather(double lat, double lon) {
        System.out.println(apiKey);

        return restTemplate.getForObject("http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=16&units=metric" , FiveDaysResponse.class );
    }
}
