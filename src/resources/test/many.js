export default [...Array(10).keys()].map((i) => ({
  name: `Timer ${i + 1}`,
  duration: `00:0${i + 1}:00`,
}));
