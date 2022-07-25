import error from './errorMiddleware';
import validateEmail from './emailMiddleware';
import validatePassword from './passwordMiddleware';
import validateMatch from './matchMiddleware';
import validateAuthorization from './validateAuthorization';

export default {
  error,
  validateEmail,
  validatePassword,
  validateMatch,
  validateAuthorization,
};
