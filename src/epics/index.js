import {combineEpics} from 'redux-observable';
import loginUser from './login.epic';
import {search} from './search.epic';

export default combineEpics(loginUser, search);
