import ui from './ui.json';
import uiCreator from './uiCreator';
import eventCreator from './eventCreator';
import './ui.scss';

const events = eventCreator();
const page = uiCreator();

const container = events.add(page.nodeCreate(ui.desktop));

page.render(document.body, container);
