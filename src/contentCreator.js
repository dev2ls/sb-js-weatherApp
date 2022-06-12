const contentCreator = (ui, details) => {
  const checkProp = (name, obj) => {
    let result;
    JSON.stringify(obj, (key, value) => {
      if (key === name) {
        result = value;
      }
      return value;
    });
    return result;
  };

  // const mainPage = async (blank) => {
  //   const data = await details;
  // };

  // const hourlyCard = () => {
  //   const hourly = ui.hourlyForecast.c.hourlyCard.c;

  //   return 'h';
  // };

  // const dailyCard = () => {};

  return {
    checkProp,
    // mainPage,
    // hourlyCard,
    // dailyCard,
  };
};

export default contentCreator;
