const contentCreator = (ui, data) => {
  const getRef = (name, obj) => {
    let result;
    const nameSearch = (prop) => {
      if (name in prop) result = prop[name];

      Object.values(prop).forEach((value) => {
        if (typeof value === 'object') return nameSearch(value);
        return result;
      });
    };
    nameSearch(obj);

    return result;
  };

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

  const mainPage = (blank) => {
    const setDateTime = () => {
      const d = new Date();

      const { date } = getRef('currentDate', blank).c;

      const { time } = getRef('currentDate', blank).c;

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

      date.textContent = `
      ${d.getDate()} 
      ${mNames[d.getMonth()]} 
      ${d.getFullYear()}
      `;

      time.textContent = `
      ${days[d.getDay()]} 
      ${add0(d, 'getHours')} : 
      ${add0(d, 'getMinutes')}
      `;
    };

    setDateTime();

    const skyImg = getRef('skyImg', blank);

    skyImg.src = data.weather.icon;

    skyImg.alt = data.weather.description;

    const sky = getRef('sky', blank);

    sky.textContent = data.weather.description;

    const current = getRef('current', blank);

    current.textContent = k2c(data.main.temp);

    const t = getRef('temperatures', blank).c;

    const tTexts = t;

    t.feelsLike.textContent = tTexts.feelsLike.textContent.concat(
      k2c(data.main.feels_like),
    );

    t.minimal.textContent = tTexts.minimal.textContent.concat(
      k2c(data.main.temp_min),
    );

    t.maximal.textContent = tTexts.maximal.textContent.concat(
      k2c(data.main.temp_max),
    );

    const o = getRef('otherData', blank).c;

    const oTexts = o;

    o.humidity.textContent = oTexts.humidity.textContent.concat(
      data.main.humidity,
      ' %',
    );

    o.pressure.textContent = oTexts.pressure.textContent.concat(
      data.main.pressure,
      ' hPa',
    );

    o.windSpeed.textContent = oTexts.windSpeed.textContent.concat(
      data.wind.speed,
      ' m/s',
    );

    o.deg.textContent = oTexts.deg.textContent.concat(data.wind.deg, ' deg.');

    const sun = getRef('sun', blank).c;

    sun.sunrise.c.time.textContent = convertTime(data.sys.sunrise);

    sun.sunset.c.time.textContent = convertTime(data.sys.sunset);

    return blank;
  };

  const hourlyCard = () => {
    const hourly = ui.hourlyForecast;

    return hourly;
  };

  const dailyCard = () => {
    const daily = ui.dailyForecast;
    console.log(daily);
    return daily;
  };

  return {
    mainPage,
    hourlyCard,
    dailyCard,
  };
};

export default contentCreator;

// let result;
// JSON.stringify(obj, (key, value) => {
//   if (key === name) {
//     result = value;
//   }
//   return value;
// });
// return JSON.parse(result);
