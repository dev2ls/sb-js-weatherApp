import weatherData from './weatherData';
import ui from './ui.json';
import uiCreator from './uiCreator';
import './ui.scss';

import contentCreator from './contentCreator';
import eventCreator from './eventCreator';

const app = async () => {
  const data = await weatherData('Szczecin');

  const page = uiCreator(data);

  const content = contentCreator(ui.desktop, data);

  const mainPage = content.mainPage(ui.desktop);

  const pageWithEvents = eventCreator(page.nodeCreate(mainPage));

  pageWithEvents.slider(6, {
    shell: 'hourlyCards',
    card: 'card',
    prev: 'hourlyPrev',
    next: 'hourlyNext',
  });

  pageWithEvents.slider(4, {
    shell: 'dailyCards',
    card: 'card',
    prev: 'dailyPrev',
    next: 'dailyNext',
  });

  page.render(document.body, pageWithEvents.node);
};

app();
