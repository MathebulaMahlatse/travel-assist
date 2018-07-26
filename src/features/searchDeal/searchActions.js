import ApiCall from '../../middleware/ApiCall';
import * as searchActionsTypes from './searchActionTypes';
import * as travelUtils from '../../utils/travelUtils';

export const travelDeals = () => {
    return dispatch => {
        ApiCall.get('/travelDeals').then(response => {
            dispatch({
                type: searchActionsTypes.SEARCH_STORE_DEALS,
                payload: response
            });

            dispatch({
                type: searchActionsTypes.SEARCH_STORE_CITIES,
                payload: travelUtils.getCities(response.deals)
            })
        });
    }
};

export const findRoutesToArrival = (departure, arrival, tripType) => {
    return (dispatch, state) => {
        const routes = travelUtils.findRoutesToArrival(state.data.deals, departure, arrival, tripType);

        dispatch({
            type: searchActionsTypes.SEARCH_STORE_ROUTE,
            payload: routes
        })
    };
};

