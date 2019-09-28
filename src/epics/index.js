import {combineEpics} from 'redux-observable';
import loginUser from './loginEpic';

export default combineEpics(loginUser);
