const _STATE = {};

const _CALLBACKS = [];

export function setState(key, value) {
  if (value === _STATE[key]) return;

  console.log('SET STATE:', { key, value });

  _STATE[key] = value;
  _CALLBACKS.forEach(({ fn, keys }) => {
    if (!keys || keys.includes(key)) {
      fn(_STATE);
    }
  });
}

export function onStateChange(keys, fn) {
  _CALLBACKS.push({ fn, keys });
}

export default {
  setState,
  onStateChange,
};
