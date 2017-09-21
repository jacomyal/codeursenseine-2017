import lines from '../assets/data.json';
import columns from '../assets/columns.json';

// Add lines count into lines:
lines.forEach((line, i) => {
  line._index = i;
});

export default {
  lines,
  columns,
};
