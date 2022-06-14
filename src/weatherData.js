const weatherData = async (city) => {
  const apiKey = '8ae3e8d71bc8cb9bbb60a87ec6790462';

  const url = 'https://api.openweathermap.org/data/2.5';

  const curReq = await fetch(`${url}/weather?q=${city}&appid=${apiKey}`, {
    mode: 'cors',
  });

  const curResp = await curReq.json();

  const { lat, lon } = curResp.coord;

  const forReq = await fetch(
    `${url}/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apiKey}`,
    { mode: 'cors' },
  );

  const forResp = await forReq.json();

  const data = {};

  data.coord = curResp.coord;

  data.main = curResp.main;

  data.wind = curResp.wind;

  data.sys = curResp.sys;

  const [weather] = curResp.weather;

  data.weather = weather;

  data.weather.icon = `http://openweathermap.org/img/wn/${curResp.weather[0].icon}@2x.png`;

  data.forecast = forResp;

  const setUrl = (array) => {
    array.forEach((card) => {
      const cond = card.weather[0];

      cond.icon = `http://openweathermap.org/img/wn/${card.weather[0].icon}@2x.png`;
    });
  };

  setUrl(data.forecast.hourly);

  setUrl(data.forecast.daily);

  return data;
};

export default weatherData;
