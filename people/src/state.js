const _STATE = {};
const _CALLBACKS = [];

function _update(key, value) {
  if (value === _STATE[key]) return false;

  _STATE[key] = value;
  return true;
}

export function setState(o, value) {
  const updates = {};

  if (!value && typeof o === 'object') {
    for (let k in o) {
      if (_update(k, o[k])) updates[k] = true;
    }
  } else if (_update(o, value)) {
    updates[o] = true;
  }

  _CALLBACKS.forEach(({ fn, keys }) => {
    if (!keys || keys.some(k => updates[k])) {
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
