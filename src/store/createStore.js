import {combineReducers} from 'redux';
import app from '../reducers/appReducer';
import data from '../reducers/dataReducer';
import { reducer as formReducer } from 'redux-form';

const reducers = combineReducers({
    app,
    data,
    form: formReducer
});


export default reducers;