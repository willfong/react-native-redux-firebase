import {
  FORM_MESSAGE_UPDATE,
  FORM_MESSAGE_POST_SUCCESS
} from '../actions/types';

export default function(state = '', action) {
  switch ( action.type ) {
    case FORM_MESSAGE_UPDATE:
      return action.payload;
    case FORM_MESSAGE_POST_SUCCESS:
      return '';
    default:
      return state;
  }
}
