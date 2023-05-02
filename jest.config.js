module.exports = {
  transform: {
    // configure jest to use swc for ts/tsx files
    // see: https://swc.rs/docs/configuring-swc
    "^.+\\.(t|j)sx?$": "@swc/jest",
  },
};
