import {combineEpics} from 'redux-observable';
import loginUser from './login.epic';
import {searchItem} from './search.epic';

export default combineEpics(loginUser, searchItem);
