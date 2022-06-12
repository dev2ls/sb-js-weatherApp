const eventCreator = (weatherObj) => {
  const add = (node) => {
    const setWeather = async () => {};

    const city = node.querySelector('#cityInput');

    const action = (event) => {
      if (event.keyCode === 13) {
        setWeather(event.target.value);
      }
    };

    city.addEventListener('keydown', action);

    setWeather(city.value);

    return node;
  };

  return { add };
};

export default eventCreator;
