/**
 * Show only logs in development environment
 * @param message
 * @param optionalParams
 * @returns void
 */
const consoleHelper = (message?: any, ...optionalParams: any[]): void => {
  if (process.env.NODE_ENV === 'production') return;
  optionalParams.length > 0 ? console.log(message, optionalParams) : console.log(message);
};

export default consoleHelper;
