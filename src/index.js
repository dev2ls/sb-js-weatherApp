import weatherData from './weatherData';
import ui from './ui.json';
import uiCreator from './uiCreator';
import './ui.scss';

import contentCreator from './contentCreator';
import eventCreator from './eventCreator';

const uicreator = uiCreator();

const startPage = eventCreator(uicreator.nodeCreate(ui.start));

const app = async (city) => {
  const loader = uicreator.nodeCreate(ui.loader);

  uicreator.render(document.body, loader);

  const data = await weatherData(city);

  document.querySelector('.loader').remove();

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

  pageWithEvents.cityGrab(
    {
      inp: 'cityInput',
      btn: 'submitBtn',
    },
    app,
  );

  page.render(document.body, pageWithEvents.node);
};

uicreator.render(
  document.body,
  startPage.cityGrab(
    {
      inp: 'cityInput',
      btn: 'submitBtn',
    },
    app,
  ),
);
// app('Szczecin');
