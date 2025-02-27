package com.kayman.backend.service;

import com.kayman.backend.model.Coordinates;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class CoordinatesService {

    RestTemplate restTemplate = new RestTemplate();

    @Value("${api.key}") // Pobieram api key z aplication.properties
    private String apiKey;

    public Coordinates[] findCoordinatesByName(String city) {
        Coordinates[] coordinatesList = restTemplate.getForObject("http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=" + apiKey, Coordinates[].class);


        return coordinatesList;
    }




}
