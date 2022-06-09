const uiCreator = () => {
  const nodeCreate = (ui) => {
    const element = structuredClone(ui);

    const { tag } = element;

    delete element.tag;

    if (element.c) delete element.c;

    if (element.i) delete element.i;

    const parent = document.createElement(tag);

    Object.entries(element).forEach((prop) => {
      const [key, value] = prop;

      if (key === 'src') {
        const link = `${value}`;

        parent[key] = require(`./${link}`);
      } else parent[key] = value;
    });

    const content = structuredClone(ui);

    if (content.c) {
      const { c } = content;

      Object.entries(c).forEach((node) => {
        const [key, value] = node;
        if (key === 'i') {
          delete c[key];

          // Object.values(value).forEach((func) => {
          //   const innerContent = contentCreator(injectedContent);

          //   const nodes = content[func]();

          //   Object.values(nodes).forEach((element) => {
          //     const child = nodeCreate(element);

          //     parent.append(child);
          //   });
          // });
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
