import React from 'react';
import {mount} from 'enzyme';
import SearchFormSection from '../searchFormSection';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

const defaultStore = mockStore({});

describe('SearchFormSection', function () {
    const wrapperMount = (props, newStore) => {
        return mount(<Provider store={newStore}>
            <SearchFormSection {...props}/>
        </Provider>);
    };
    it('should render component', () => {
        const props = {
            cities: {
                departure: [ 'Cheapest', 'Fastest' ],
                arrival: [
                    'Test 3'
                ]
            }
        };
        const wrapper = wrapperMount(props, defaultStore);
        //expect(wrapper).notNull()
    });
});