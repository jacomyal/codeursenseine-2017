import lines from '../assets/data.json';
import columns from '../assets/columns.json';

// Add lines count into lines:
lines.forEach((line, i) => {
  line._index = i;
  line._print1 = Math.floor(100 * Math.random());
  line._print2 = Math.floor(100 * Math.random());
  line._print3 = Math.floor(100 * Math.random());
});

export default {
  lines,
  columns,
};
