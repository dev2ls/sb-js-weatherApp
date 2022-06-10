import weatherData from './weatherData';
import ui from './ui.json';

const eventCreator = () => {
  const add = (node) => {
    const k2c = (temp) => {
      const kelvin = -273.16;

      const celsium = Math.round((temp + kelvin) * 10) / 10;

      return celsium;
    };

    const convertTime = (seconds) => {
      const date = new Date(seconds * 1000);

      const string = `${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()}`;

      return string;
    };

    const city = node.querySelector('#cityInput');

    city.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        const curTemp = ui.desktop.container.c.currentTemp.c;

        const current = document.querySelector(`#${curTemp.current.id}`);

        const feelsLike = document.querySelector(`#${curTemp.feelsLike.id}`);

        const minimal = document.querySelector(`#${curTemp.minimal.id}`);

        const maximal = document.querySelector(`#${curTemp.maximal.id}`);

        const curData = ui.desktop.container.c.currentData.c;

        const humidity = document.querySelector(`#${curData.humidity.id}`);

        const pressure = document.querySelector(`#${curData.pressure.id}`);

        const windSpeed = document.querySelector(`#${curData.windSpeed.id}`);

        const otherData = ui.desktop.container.c.otherData.c;

        const sunrise = document.querySelector(
          `#${otherData.sun.c.sunrise.c.time.id}`,
        );

        const sunset = document.querySelector(
          `#${otherData.sun.c.sunset.c.time.id}`,
        );

        const setCurWeather = async () => {
          const weather = await weatherData().getCurrent(city.value);

          current.textContent = current.textContent.concat(
            k2c(weather.main.temp),
          );

          feelsLike.textContent = feelsLike.textContent.concat(
            k2c(weather.main.feels_like),
          );

          minimal.textContent = minimal.textContent.concat(
            k2c(weather.main.temp_min),
          );

          maximal.textContent = maximal.textContent.concat(
            k2c(weather.main.temp_max),
          );

          humidity.textContent = humidity.textContent.concat(
            weather.main.humidity,
            ' %',
          );

          pressure.textContent = pressure.textContent.concat(
            weather.main.pressure,
            ' hPa',
          );

          windSpeed.textContent = windSpeed.textContent.concat(
            weather.wind.speed,
            ' m/s',
          );

          sunrise.textContent = convertTime(weather.sys.sunrise);

          sunset.textContent = convertTime(weather.sys.sunset);
        };

        setCurWeather();
      }
    });

    return node;
  };

  return { add };
};

export default eventCreator;
