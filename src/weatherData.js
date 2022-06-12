const weatherData = async (city) => {
  const apikey = '8ae3e8d71bc8cb9bbb60a87ec6790462';

  const url = 'https://api.openweathermap.org/data/2.5';

  const curreq = await fetch(`${url}/weather?q=${city}&appid=${apikey}`, {
    mode: 'cors',
  });

  const curresp = await curreq.json();

  const { lat, lon } = curresp.coord;

  const forreq = await fetch(
    `${url}/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${apikey}`,
    { mode: 'cors' },
  );

  const forresp = await forreq.json();

  const data = {};

  data.coord = curresp.coord;

  data.main = curresp.main;

  data.wind = curresp.wind;

  data.sys = curresp.sys;

  const [weather] = curresp.weather;

  data.weather = weather;

  data.weather.icon = `http://openweathermap.org/img/wn/${curresp.weather[0].icon}@2x.png`;

  data.forecast = forresp;

  return data;
};

export default weatherData;
