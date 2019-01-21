import { combineReducers } from 'redux';
import userReducer from './saga/user_reducer'
const allReducers = combineReducers({
    user: userReducer,
});
export default allReducers;