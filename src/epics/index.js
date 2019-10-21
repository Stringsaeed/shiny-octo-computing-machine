import {combineEpics} from 'redux-observable';
import loginUser from './login.epic';
import {searchProducts, searchUsers} from './search.epic';

export default combineEpics(loginUser, searchProducts, searchUsers);
