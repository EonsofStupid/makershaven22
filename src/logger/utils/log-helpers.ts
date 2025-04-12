
import { LogCategory } from "../../shared/types/enums";

export const formatLogMessage = (message: string, category?: LogCategory) => {
  return `[${category || 'general'}] ${message}`;
};

export const formatErrorForLogging = (error: Error) => {
  return {
    message: error.message,
    stack: error.stack,
    name: error.name
  };
};

export const logToConsole = (message: string, level: string = 'log') => {
  const timestamp = new Date().toISOString();
  const formattedMessage = `[${timestamp}] ${message}`;
  
  switch (level) {
    case 'error':
      console.error(formattedMessage);
      break;
    case 'warn':
      console.warn(formattedMessage);
      break;
    case 'info':
      console.info(formattedMessage);
      break;
    case 'debug':
      console.debug(formattedMessage);
      break;
    default:
      console.log(formattedMessage);
  }
};
