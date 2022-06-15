const eventCreator = (nodes) => {
  const node = nodes;

  const slider = (offset, sets) => {
    const shell = node.querySelector(`#${sets.shell}`);

    const content = node.querySelectorAll(`#${sets.shell}>.${sets.card}`);

    const contentCopy = content;

    const prevBtn = node.querySelector(`#${sets.prev}`);

    const nextBtn = node.querySelector(`#${sets.next}`);

    content.forEach((item) => item.remove());

    let i = 0;

    const ticker = (onset, reverse = false) => {
      let [s, e] = [0, 0];

      if (reverse) {
        [s, e] = [onset, onset - offset];

        i -= offset;
      } else {
        [s, e] = [onset, onset + offset];

        i += offset;
      }

      if (e < s) [s, e] = [onset - offset, onset];

      if (s < offset) {
        [s, e, i] = [0, 0 + offset, 0 + offset];
      }

      if (s + offset >= contentCopy.length) {
        const { length } = contentCopy;

        let index = length - (length % offset);

        if (index === length) index = length - offset;

        [i, s, e] = [index, index, length];
      }

      shell.replaceChildren();

      for (let ind = s; ind < e; ind += 1) {
        shell.append(contentCopy[ind]);
      }
    };

    ticker(i);

    nextBtn.addEventListener('click', () => {
      ticker(i);
    });

    prevBtn.addEventListener('click', () => {
      ticker(i, true);
    });

    return node;
  };

  const cityGrab = (sets, app) => {
    const input = node.querySelector(`#${sets.inp}`);

    const actOnEnter = (event) => {
      if (event.keyCode === 13) {
        node.remove();

        return app(event.target.value);
      }
    };

    input.addEventListener('keydown', actOnEnter);

    const actOnBtn = () => {
      node.remove();

      const result = app(input.value);

      return result;
    };

    if (sets.btn) {
      const btn = node.querySelector(`#${sets.btn}`);

      btn.addEventListener('click', actOnBtn);
    }

    return node;
  };

  return {
    slider,
    cityGrab,
    node,
  };
};

export default eventCreator;
