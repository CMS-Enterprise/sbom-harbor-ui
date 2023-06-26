/**
 * Logs performance metrics to the console in development mode.
 * @param {unknown} entry - the performance entry
 * @see https://create-react-app.dev/docs/measuring-performance/
 * @see https://web.dev/measure/
 * @see https://web.dev/user-centric-performance-metrics/
 */
const onPerfEntry = (entry: unknown) => {
  console.debug(entry)
}

export default onPerfEntry
