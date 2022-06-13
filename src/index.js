import weatherData from './weatherData';
import ui from './ui.json';
import uiCreator from './uiCreator';
import './ui.scss';

import contentCreator from './contentCreator';

const app = async () => {
  const data = await weatherData('Szczecin');

  const weather = JSON.parse(JSON.stringify(data));

  const page = uiCreator();

  const content = contentCreator(ui.desktop, weather);

  const mainPage = content.mainPage(ui.desktop);

  page.render(document.body, page.nodeCreate(mainPage));
};

app();
