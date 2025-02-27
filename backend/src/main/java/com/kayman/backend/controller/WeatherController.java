package com.kayman.backend.controller;

import com.kayman.backend.model.Coordinates;
import com.kayman.backend.model.FiveDaysResponse;
import com.kayman.backend.model.WeatherResponse;
import com.kayman.backend.service.CoordinatesService;
import com.kayman.backend.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherController {

    private final CoordinatesService coordinatesService;

    private final WeatherService weatherService;

    public WeatherController(CoordinatesService coordinatesService, WeatherService weatherService) {
        this.coordinatesService = coordinatesService;
        this.weatherService = weatherService;
    }

    @GetMapping({"", "/"})
    public WeatherResponse index(@RequestParam(required = false) String city) {

        if (city != null) {
            Coordinates[] coordinates = coordinatesService.findCoordinatesByName(city);
            System.out.println(coordinates[0].getName());
            System.out.println(coordinates[0].getLat());
            System.out.println(coordinates[0].getLon());

            FiveDaysResponse response = weatherService.getDailyWeather(coordinates[0].getLat(), coordinates[0].getLon());

            System.out.println(response.getList().getFirst().getMain().getTemp());

            return new WeatherResponse(city, response.getList().getFirst().getMain().getTemp());
        }

        System.out.println("Nie podano miasta");

        return null;
    }

}
