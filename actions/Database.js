import firebase from 'firebase';
import {
  DATABASE_FETCH_MESSAGES_SUCCESS
} from './types';


export const listMessages = () => {
  return (dispatch) => {
    firebase.database().ref(`/messages`)
      .on('value', snapshot => {
        dispatch({ type: DATABASE_FETCH_MESSAGES_SUCCESS, payload: snapshot.val() });
      });
  };
};
