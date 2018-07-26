import * as searchActionTypes from '../features/searchDeal/searchActionTypes';

const initialState = {
    deals: null,
    cities: null,
    route: null
};

const app = (state = initialState, action = null) => {
    switch(action.type) {
        case searchActionTypes.SEARCH_STORE_DEALS: {
            return {
                ...state,
                deals: action.payload
            }
        }

        case searchActionTypes.SEARCH_STORE_CITIES: {
            return {
                ...state,
                cities: action.payload
            }
        }

        case searchActionTypes.SEARCH_STORE_ROUTE: {
            return {
                ...state,
                route: action.payload
            }
        }

        default:
            return state;
    }
};

export default app;