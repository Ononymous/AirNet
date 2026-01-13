import { Alert } from 'react-native';

export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = 'APIError';
    this.statusCode = statusCode;
  }
}

export const handleError = (error, context = 'Error', showAlert = true) => {
  console.error(`[${context}]`, error);

  let title = 'Error';
  let message = 'Something went wrong. Please try again.';

  if (error instanceof NetworkError) {
    title = 'Network Error';
    message = 'Please check your internet connection and try again.';
  } else if (error instanceof APIError) {
    title = 'API Error';
    if (error.statusCode === 429) {
      message = 'Too many requests. Please wait a moment and try again.';
    } else if (error.statusCode === 404) {
      message = 'The requested data could not be found.';
    } else {
      message = error.message || 'Failed to fetch data from server.';
    }
  } else if (error.message) {
    message = error.message;
  }

  if (showAlert) {
    Alert.alert(title, message);
  }

  return { title, message };
};

export const withErrorHandling = async (asyncFn, context, showAlert = true) => {
  try {
    return await asyncFn();
  } catch (error) {
    handleError(error, context, showAlert);
    return null;
  }
};
