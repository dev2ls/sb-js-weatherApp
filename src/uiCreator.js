import contentCreator from './contentCreator';
import injectedContent from './injectedContent.json';

const uiCreator = (data) => {
  const nodeCreate = (ui) => {
    const element = structuredClone(ui);

    const { tag } = element;

    delete element.tag;

    if (element.c) delete element.c;

    if (element.i) delete element.i;

    if (element.s) delete element.s;

    const parent = document.createElement(tag);

    Object.entries(element).forEach((prop) => {
      const [key, value] = prop;

      // if (key === 'src') {
      //   const link = `${value}`;

      //   parent[key] = require(`./${link}`);
      // } else
      parent[key] = value;
    });

    const blank = structuredClone(ui);

    if (blank.c) {
      const { c } = blank;

      Object.entries(c).forEach((node) => {
        const [key, value] = node;

        if (key === 'i') {
          delete c[key];

          Object.values(value).forEach((func) => {
            const content = contentCreator(injectedContent, data);

            const nodes = content[func]();

            Object.values(nodes).forEach((el) => {
              const child = nodeCreate(el);

              parent.append(child);
            });
          });
        } else {
          const child = nodeCreate(value);

          parent.append(child);
        }
      });
    }

    return parent;
  };

  const render = (pointer, node) => {
    pointer.append(node);
  };

  return { nodeCreate, render };
};

export default uiCreator;
