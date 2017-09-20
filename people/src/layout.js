import _ from 'lodash';

import data from './data';
import sprites from './sprites';

import {
  WIDTH, HEIGHT, MARGIN,
  SPRITE_WIDTH, SPRITE_HEIGHT,
  ANSWER_MISSING, ANSWER_OTHERS,
  BORDER_MARGIN, MAX_VALUES,
} from './consts';

export function barChart(column) {
  let values = {};
  let isNumberField = true;

  // 1. Count values:
  data.lines.forEach(line => {
    let value = line[column];
    if (value == null) return;
    if (Array.isArray(value)) value = value[0];
    if (typeof value !== 'number') isNumberField = false;

    if (values[value]) {
      values[value]++;
    } else {
      values[value] = 1;
    }
  });

  // 2. Sort values:
  if (isNumberField) {
    values = _(values)
      .map((count, value) => ({ count, value: +value }))
      .sortBy('value')
      .value();
  } else {
    values = _(values)
      .map((count, value) => ({ count, value }))
      .sortBy(({ count }) => -count)
      .value();
    if (values.length > MAX_VALUES) {
      values = values
        .slice(0, MAX_VALUES - 1)
        .concat([{
          count: _.sumBy(values.slice(MAX_VALUES - 1), 'count'),
          value: ANSWER_OTHERS,
        }]);
    }
  }

  // 3. Add "missing" value:
  const total = _.sumBy(values, 'count');
  if (total < data.lines.length) {
    values.push({
      count: data.lines.length - total,
      value: ANSWER_MISSING,
    });
  }

  /**
   * 4. Define bars:
   *
   * Now that part is a bit annoying : Depending on the repartition of the
   * values of the bars, the total space occupied by the bars can varry. A lot.
   *
   * So we cannot use the Sprite size to determine the number and sizes of rows
   * and columns. But we still want to preserve the Sprite width / height ratio.
   */
  const max = _.maxBy(values, 'count').count;
  const width = (
    WIDTH
    - 2 * BORDER_MARGIN
    - (values.length - 1) * MARGIN
  ) / values.length;
  values.forEach((value, i) => {
    const height = (HEIGHT - 2 * BORDER_MARGIN) * value.count / max;

    value.left = (width + MARGIN) * i;
    value.top = (HEIGHT - 2 * BORDER_MARGIN) * (max - value.count) / max;
    value.rows = Math.ceil(Math.sqrt(
      value.count * (height * SPRITE_WIDTH) / (width * SPRITE_HEIGHT)
    ));
    value.cols = Math.ceil(Math.sqrt(
      value.count * (width * SPRITE_HEIGHT) / (height * SPRITE_WIDTH)
    ));
    value.colWidth = width / value.cols;
    value.rowHeight = height / value.rows;
  });

  // 5. Fill bars:
  const dict = _.keyBy(values, 'value');
  const spentValues = _(values)
    .keyBy('value')
    .mapValues(() => 0)
    .value();
  data.lines.forEach((line, i) => {
    let value = line[column];
    if (value == null) value = ANSWER_MISSING;
    if (Array.isArray(value)) value = value[0];
    if (!dict[value]) value = ANSWER_OTHERS;

    const bar = dict[value];
    const index = spentValues[value];
    const total = dict[value].count;
    const col = index % bar.cols;
    const row = Math.floor(index / bar.cols);

    const sprite = sprites[i];
    sprite.targetX = BORDER_MARGIN + bar.left + col * bar.colWidth;
    sprite.targetY = HEIGHT - BORDER_MARGIN - row * bar.rowHeight;

    spentValues[value]++;
  });

  // 6. Deal with captions:
  const container = document.getElementById('captions');
  container.innerHTML = '';
  values.forEach(value => {
    const label = document.createElement('DIV');
    label.setAttribute('title', value.value + ' : ' + value.count);
    label.setAttribute('class', 'caption');
    label.style.left = (BORDER_MARGIN + value.left) + 'px';
    label.style.width = width + 'px';
    label.style.height = width + 'px';
    label.style.lineHeight = width + 'px';
    console.log(label.style);

    const wrapper = document.createElement('SPAN');
    wrapper.innerHTML = value.value;
    label.append(wrapper);
    captions.append(label);
  })

  if (values.length > 6) {
    container.classList.add('many');
    container.classList.remove('few');
  } else {
    container.classList.remove('many');
    container.classList.add('few');
  }
}
