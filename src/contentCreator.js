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

  const convertTime = (seconds, type) => {
    const date = new Date(seconds * 1000);

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    let string = '';

    if (type.includes('d')) string += `${add0(date, 'getDate')}`;

    if (type.includes('w')) string += ` ${days[date.getDay()]}`;

    if (type.includes('h')) string += `${add0(date, 'getHours')}`;

    if (type.includes('m')) string += ` : ${add0(date, 'getMinutes')}`;

    if (type.includes('s')) string += ` : ${add0(date, 'getSeconds')}`;

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

    sun.sunrise.c.time.textContent = convertTime(data.sys.sunrise, 'hms');

    sun.sunset.c.time.textContent = convertTime(data.sys.sunset, 'hms');

    return blank;
  };

  const hourlyCard = () => {
    const hourly = { ui: ui.hourlyForecast };

    const f = data.forecast;

    const card = getRef('hourlyCard', hourly);

    const cards = hourly.ui.c.wrapper.c;

    delete hourly.ui.c.wrapper.c.hourlyCard;

    f.hourly.map((ticket, i) => {
      const cardRef = structuredClone(card);

      const key = `h${i + 1}`;

      const hour = getRef('hour', cardRef);

      hour.textContent = convertTime(ticket.dt, 'h');

      const icon = getRef('icon', cardRef);

      icon.src = ticket.weather[0].icon;

      icon.alt = ticket.weather[0].description;

      const descr = getRef('descr', cardRef);

      descr.textContent = ticket.weather[0].main;

      const temp = getRef('temperature', cardRef);

      temp.innerHTML = `${k2c(ticket.temp)} ${temp.s}`;

      const pressure = getRef('pressure', cardRef);

      pressure.textContent = `${ticket.pressure} hPa`;

      const humidity = getRef('humidity', cardRef);

      humidity.textContent = `${ticket.humidity} %`;

      const windSpeed = getRef('windSpeed', cardRef);

      windSpeed.textContent = `${ticket.wind_speed} m/s`;

      const deg = getRef('deg', cardRef);

      deg.textContent = `${ticket.wind_deg} deg.`;

      cards[key] = cardRef;

      return cards[key];
    });

    return hourly;
  };

  const dailyCard = () => {
    const daily = { ui: ui.dailyForecast };

    const f = data.forecast;

    const card = getRef('dailyCard', daily);

    const cards = daily.ui.c.wrapper.c;

    delete daily.ui.c.wrapper.c.dailyCard;

    f.daily.map((ticket, i) => {
      const cardRef = structuredClone(card);

      const key = `d${i + 1}`;

      const date = getRef('date', cardRef);

      date.textContent = convertTime(ticket.dt, 'dw');

      const icon = getRef('icon', cardRef);

      icon.src = ticket.weather[0].icon;

      icon.alt = ticket.weather[0].description;

      const descr = getRef('descr', cardRef);

      descr.textContent = ticket.weather[0].description;

      const sunrise = getRef('sunrise', cardRef);

      sunrise.textContent = convertTime(ticket.sunrise, 'hm');

      const sunset = getRef('sunset', cardRef);

      sunset.textContent = convertTime(ticket.sunset, 'hm');

      const temperatures = getRef('temperatures', cardRef);

      const temp = temperatures.c.temp.c;

      temp.morning = k2c(ticket.temp.morn);

      temp.day = k2c(ticket.temp.day);

      temp.evening = k2c(ticket.temp.eve);

      temp.night = k2c(ticket.temp.night);

      const feels = temperatures.c.feelsLike.c;

      feels.morning = k2c(ticket.feels_like.morn);

      feels.day = k2c(ticket.feels_like.day);

      feels.evening = k2c(ticket.feels_like.eve);

      feels.night = k2c(ticket.feels_like.night);

      const humidity = getRef('humidity', cardRef);

      humidity.textContent = `${ticket.humidity} %`;

      const pressure = getRef('pressure', cardRef);

      pressure.textContent = `${ticket.pressure} hPa`;

      const windSpeed = getRef('windSpeed', cardRef);

      windSpeed.textContent = `${ticket.wind_speed} m/s`;

      const deg = getRef('deg', cardRef);

      deg.textContent = `${ticket.wind_deg} deg.`;

      const uvi = getRef('uvi', cardRef);

      uvi.textContent = ticket.uvi;

      cards[key] = cardRef;

      return cards[key];
    });

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
