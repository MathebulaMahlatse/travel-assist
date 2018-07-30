import dataReducer from '../dataReducer';
import {SEARCH_STORE_CITIES, SEARCH_STORE_DEALS, SEARCH_STORE_ROUTE} from "../../features/searchDeal/searchActionTypes";

describe('DataReducer', function () {
    it('should return default state if action does not exist', () => {
        const expected = {
            deals: null,
            cities: null,
            route: null
        };

        const data = dataReducer(expected);

        expect(data).toEqual(expected)
    });

    it('should store deals', () => {
        let state = {
            deals: null,
            cities: null,
            route: null
        };

        const payload = {
            data: 'here'
        };

        const data = dataReducer(state, {
            type: SEARCH_STORE_DEALS,
            payload
        });

        expect(data).toEqual({
            ...state,
            deals: payload
        })
    });

    it('should store cities', () => {
        let state = {
            deals: null,
            cities: null,
            route: null
        };

        const payload = {
            city: 'here'
        };

        const data = dataReducer(state, {
            type: SEARCH_STORE_CITIES,
            payload
        });

        expect(data).toEqual({
            ...state,
            cities: payload
        })
    });

    it('should store routes', () => {
        let state = {
            deals: null,
            cities: null,
            route: null
        };

        const payload = {
            route: 'here'
        };

        const data = dataReducer(state, {
            type: SEARCH_STORE_ROUTE,
            payload
        });

        expect(data).toEqual({
            ...state,
            route: payload
        })
    });
});