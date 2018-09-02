import { combineReducers } from 'redux';
import auth from './Auth';
import database from './Database';
import form from './Form';

export default combineReducers({
  auth, database, form
});
