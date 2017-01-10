var consoleWarn = console.warn;
var consoleError = console.error;
const logToError = (error) => {
  throw new Error(error.replace(/(?:Warning: )?/, ''));
};
jasmine.getEnv().beforeEach(() => {
  console.warn = logToError;
  console.error = logToError;
});
jasmine.getEnv().afterEach(() => {
  console.warn = consoleWarn;
  console.error = consoleError;
});
