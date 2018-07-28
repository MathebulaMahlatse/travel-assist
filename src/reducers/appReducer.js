import * as searchActionTypes from '../features/searchDeal/searchActionTypes';
import * as dealActionTypes from '../features/viewDeal/dealActionTypes';

const initialState = {
    searchSuccess: null
};

const app = (state = initialState, action = null) => {
    switch(action.type) {
        case searchActionTypes.SEARCH_SUCCESS: {
            return {
                ...state,
                searchSuccess: action.payload
            }
        }

        case dealActionTypes.DEAL_RESET: {
            return {
                ...state,
                searchSuccess: false
            }
        }

        default:
            return state;
    }
};

export default app;