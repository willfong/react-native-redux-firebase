import firebase from 'firebase';
import {
  FORM_MESSAGE_UPDATE,
  FORM_MESSAGE_POST_SUCCESS
} from './types';

export const messageUpdate = (text) => {
  return {
    type: FORM_MESSAGE_UPDATE,
    payload: text
  }
};

export const postMessage = ({name, form}) => async dispatch => {
  const { currentUser } = firebase.auth();
  console.log(currentUser);
  await firebase.database().ref('/messages').push({name, message: form})
  return dispatch({ type: FORM_MESSAGE_POST_SUCCESS });
}
