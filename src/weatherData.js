const weatherData = () => {
  const apiKey = '8ae3e8d71bc8cb9bbb60a87ec6790462';

  const url = 'https://api.openweathermap.org/data/2.5';

  const getCurrent = async (cityName) => {
    const request = await fetch(
      `${url}/weather?q=${cityName}&APPID=${apiKey}`,
      { mode: 'cors' },
    );

    const response = await request.json();

    const data = {};

    data.coord = response.coord;

    data.main = response.main;

    data.weather = response.weather;

    return data;
  };

  const getForecast = async (coord) => {
    const { lat, lon } = coord;

    const request = await fetch(
      `${url}/onecall?lat=${lat}&lon=${lon}&exclude=minutely&APPID=${apiKey}`,
      { mode: 'cors' },
    );

    const response = await request.json();

    return response;
  };

  return { getCurrent, getForecast };
};

export default weatherData;
