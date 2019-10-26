import {
  PASSWORD_ERROR,
  EMAIL_ERROR,
  LOGGING_SUCCESS,
  LOGIN_REQUEST,
} from '../constants/login.actions';

const initialState = {
  isLoading: false,
  emailError: false,
  passwordError: false,
  success: false,
  settings: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGGING_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        settings: action.payload,
      };
    case PASSWORD_ERROR:
      return {
        ...state,
        isLoading: false,
        passwordError: true,
      };
    case EMAIL_ERROR:
      return {
        ...state,
        isLoading: false,
        emailError: true,
      };
    default:
      return state;
  }
}
