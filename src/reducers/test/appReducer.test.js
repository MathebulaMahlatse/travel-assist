import app from '../appReducer';
import {SEARCH_SUCCESS} from "../../features/searchDeal/searchActionTypes";
import {DEAL_RESET} from "../../features/viewDeal/dealActionTypes";

describe('AppReducer', function () {
    it('should update state with searchSuccess status', () => {
        const action = {
            type: SEARCH_SUCCESS,
            payload: true
        }
        const appReducer = app({
            searchSuccess: null,
            searchParams: null
        }, action);

        expect(appReducer).toEqual({searchParams: null, searchSuccess: true})
    });

    it('should reset deal status', () => {
        const action = {
            type: DEAL_RESET
        };

        const appReducer = app({
            searchSuccess: null,
            searchParams: null
        }, action);

        expect(appReducer).toEqual({searchParams: null, searchSuccess: false})
    });

    it('should return default state if not action is provided', () => {
        const expected = {
            searchSuccess: null,
            searchParams: null
        };
        
        const appReducer = app(expected);

        expect(appReducer).toEqual(expected);
    });
});
