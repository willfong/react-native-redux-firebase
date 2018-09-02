import {
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_FAIL,
  SAVE_TOKEN,
  SAVE_NAME,
  FACEBOOK_LOGOUT_SUCCESS
} from '../actions/types';

export default function(state = {}, action) {
  switch ( action.type) {
    case FACEBOOK_LOGIN_SUCCESS:
      return { token: action.payload };
    case FACEBOOK_LOGIN_FAIL:
      return { token: null };
    case SAVE_TOKEN:
      return { token: action.payload };
    case FACEBOOK_LOGOUT_SUCCESS:
      return { token: null }
    case SAVE_NAME:
      return { name: action.payload };
    default:
      return state;
  }
}
