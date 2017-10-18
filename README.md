# Weather App
___

#### Requirements

>Use the OpenWeatherMap API to build an application that meets the following criteria.

**given** a user wants to view weather information
**when** the user visits your initial view
**then** there should be an input field to accept a zip code value

**given** a user wants to view weather information
**when** the user visits your initial view
**then** there should be a submit button next to the zip code field

**given** a user has entered in some text into the zip code field
**when** the user presses the enter key
**or** the user clicks the submit button
**then** the value should be validated as a zip code (5 digit number)

**given** the user has entered a valid zip code
**when** the user presses the enter key
**or** clicks the submit button
**then** the current weather for the provided zip code should be displayed, which includes

- Temperature
- Conditions
- Air pressure
- Wind speed
- An affordance to view the forecast for the current day, the next three days, or the next 7 days

**given** the user is viewing the current forecast
**when** the user clicks on the link to view the 3 day forecast
**then** the current data (see above), and the data for the next 3 days should be displayed

**given** the user is viewing the current forecast
**when** the user clicks on the link to view the 7 day forecast
**then** the current data (see above), and the data for the next 7 days should be displayed

#### Note

Temperature is returned in Kelvin. You will need to add to the query string to get results in Fahrenheit and Celsius.

Fahrenheit: units=imperial
Celsius: units=metric
Example: http://api.openweathermap.org/data/2.5/weather?q=London&appid=XXXXXX&units=imperial
