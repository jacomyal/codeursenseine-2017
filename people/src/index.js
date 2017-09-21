import { forEach } from 'lodash';

import data from './data';
import scene from './scene';
import layout from './layout';
import sprites from './sprites';
import { setState, onStateChange } from './state';

// Fill and plug select:
const select = document.querySelector('select#question');

forEach(data.columns, (value, key) => {
  if (key === 'Timestamp') return

  const option = document.createElement('option');
  option.innerHTML = value;
  option.setAttribute('value', key);
  select.append(option);
});

select.addEventListener('change', () => {
  setState('question', select.value);
});

onStateChange(['question'], ({ question, width, height }) => {
  select.value = question;
  layout(question, width, height);
});

// Add scene into the DOM:
const container = document.getElementById('scene');
container.appendChild(scene.view);

// Handle resizing:
window.addEventListener('resize', () => {
  setState({
    width: container.clientWidth,
    height: container.clientHeight,
  });
});

onStateChange(['width', 'height'], ({ question, width, height }) => {
  scene.renderer.resize(width, height);
  layout(question, width, height);
});

// Set initial state:
setState({
  question: select.value,
  width: container.clientWidth,
  height: container.clientHeight,
});
