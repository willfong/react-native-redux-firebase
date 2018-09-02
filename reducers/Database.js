import {
  DATABASE_FETCH_MESSAGES_SUCCESS
} from '../actions/types';

export default function(state = {}, action) {
  switch ( action.type ) {
    case DATABASE_FETCH_MESSAGES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}
