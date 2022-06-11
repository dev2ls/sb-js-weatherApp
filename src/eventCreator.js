import weatherData from './weatherData';
import names from './names.json';
import ui from './ui.json';

const eventCreator = () => {
  const add = (node) => {
    const k2c = (temp) => {
      const kelvin = -273.16;

      const celsium = Math.round(temp + kelvin);

      return celsium;
    };

    const add0 = (date, prop) => {
      const with0 = `0${date[prop]()}`.slice(-2);
      return with0;
    };

    const convertTime = (seconds) => {
      const date = new Date(seconds * 1000);

      const string = `
      ${add0(date, 'getHours')} : 
      ${add0(date, 'getMinutes')} : 
      ${add0(date, 'getSeconds')}
      `;

      return string;
    };

    const setDateTime = () => {
      const date = new Date();

      const path = names.titles;

      const dateSpan = node.querySelector(`#${path.date[0]}`);

      const timeSpan = node.querySelector(`#${path.time[0]}`);

      const mNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      dateSpan.textContent = `
      ${date.getDate()} 
      ${mNames[date.getMonth()]} 
      ${date.getFullYear()}
      `;

      timeSpan.textContent = `
      ${days[date.getDay()]} 
      ${add0(date, 'getHours')} : 
      ${add0(date, 'getMinutes')}
      `;
    };

    const city = node.querySelector('#cityInput');

    const setWeather = async () => {
      const name = names.titles;

      const skyImg = node.querySelector(`#${name.skyImg[0]}`);

      const sky = node.querySelector(`#${name.sky[0]}`);

      const current = node.querySelector(`#${name.current[0]}`);

      const feelsLike = node.querySelector(`#${name.feelsLike[0]}`);

      const minimal = node.querySelector(`#${name.minimal[0]}`);

      const maximal = node.querySelector(`#${name.maximal[0]}`);

      const humidity = node.querySelector(`#${name.humidity[0]}`);

      const pressure = node.querySelector(`#${name.pressure[0]}`);

      const windSpeed = node.querySelector(`#${name.windSpeed[0]}`);

      const deg = node.querySelector(`#${name.deg[0]}`);

      const sunrise = node.querySelector(`#${name.sunrise[0]}`);

      const sunset = node.querySelector(`#${name.sunset[0]}`);

      try {
        const data = await weatherData().getCurrent(city.value);

        skyImg.src = data.weather.icon;

        skyImg.alt = data.weather.description;

        sky.textContent = data.weather.description;

        current.textContent = k2c(data.main.temp);

        const tempPath = ui.desktop.c.current.c;

        const tempTexts = tempPath.tempWrapper.c.temperatures.c;

        feelsLike.textContent = tempTexts.feelsLike.textContent.concat(
          k2c(data.main.feels_like),
        );

        minimal.textContent = tempTexts.minimal.textContent.concat(
          k2c(data.main.temp_min),
        );

        maximal.textContent = tempTexts.maximal.textContent.concat(
          k2c(data.main.temp_max),
        );

        const otherTexts = tempPath.otherData.c;

        humidity.textContent = otherTexts.humidity.textContent.concat(
          data.main.humidity,
          ' %',
        );

        pressure.textContent = otherTexts.pressure.textContent.concat(
          data.main.pressure,
          ' hPa',
        );

        windSpeed.textContent = otherTexts.windSpeed.textContent.concat(
          data.wind.speed,
          ' m/s',
        );
        deg.textContent = otherTexts.deg.textContent.concat(
          data.wind.deg,
          ' deg.',
        );

        sunrise.textContent = convertTime(data.sys.sunrise);

        sunset.textContent = convertTime(data.sys.sunset);
      } catch (e) {
        console.error(e);
      }
    };

    const action = (event) => {
      if (event.keyCode === 13) {
        setWeather();
      }
    };

    city.addEventListener('keydown', action);

    setWeather();
    setDateTime();

    return node;
  };

  return { add };
};

export default eventCreator;
