export function clickOutside(node, params) {
  const { enabled: initialEnabled, cb } = params;

  const handleOutsideClick = ({ target }) => {
    if (!node.contains(target)) {
      cb();
    }
  };

  function update({ enabled }) {
    if (enabled) {
      window.addEventListener("click", handleOutsideClick);
    } else {
      window.removeEventListener("click", handleOutsideClick);
    }
  }
  update({ enabled: initialEnabled });
  return {
    update,
    destroy() {
      window.removeEventListener("click", handleOutsideClick);
    },
  };
}

export function classes(node, params) {
  function update(cls) {
    for (let entry of Object.entries(cls)) {
      if (entry[1]) {
        entry[0].split(" ").forEach((x) => node.classList.add(x));
      } else {
        entry[0].split(" ").forEach((x) => node.classList.remove(x));
      }
    }
  }
  update(params);
  return {
    update,
  };
}
