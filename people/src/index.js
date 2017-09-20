import { forEach } from 'lodash';

import data from './data';
import scene from './scene';
import sprites from './sprites';
import { barChart } from './layout';
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

onStateChange(['question'], ({ question }) => {
  select.value = question;
  barChart(question);
});

setState('question', select.value);

// Add Pixi scene:
document.getElementById('scene').appendChild(scene.view);
