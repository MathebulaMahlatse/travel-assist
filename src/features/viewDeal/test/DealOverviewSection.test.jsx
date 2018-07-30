import React from 'react';
import {mount} from 'enzyme';
import DealOverviewSection from '../dealOverviewSection';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const middleWare = [thunk];
const mockStore = configureMockStore(middleWare);

const defaultStore = mockStore({});

describe('DealOverviewSection', function () {
    const wrapperMount = (props, newStore) => {
        return mount(<Provider store={newStore}>
            <DealOverviewSection {...props}/>
        </Provider>);
    };
    it('should render component', () => {
        const props = {
            route: [
                {
                    departure: 'London',
                    discount: 0,
                    cost: 10,
                    transport: 'bus',
                    reference: 'ASDAS',
                    duration: {
                        h: '12',
                        m: '11'
                    }
                },
                {
                    departure: 'London',
                    discount: 0,
                    cost: 10,
                    transport: 'bus',
                    reference: 'ASDAS',
                    duration: {
                        h: '19',
                        m: '00'
                    }
                }
            ],
            searchParams: {
                departure: 'London',
                arrival: 'Rome'
            }
        }
        const wrapper = wrapperMount(props, defaultStore);
        expect(wrapper.find('#ref').at(0).text()).toBe('ASDAS for 12h11');
        expect(wrapper.find('#ref').at(1).text()).toBe('ASDAS for 19h00');
    });
});