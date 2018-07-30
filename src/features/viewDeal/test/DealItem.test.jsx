import React from 'react';
import {mount} from 'enzyme';
import DealItem from '../dealItem';

describe('DealItem', function () {
    it('should render component', () => {
        const props = {
            searchParams: {
                departure: 'London',
                arrival: 'Rome'
            },
            departure: 'London',
            discount: 0,
            cost: 10,
            currency: 'EURO',
            transport: 'bus',
            reference: 'ASDAS',
            duration: {
                h: '12',
                m: '11'
            }
        };

        const wrapper = mount(<DealItem {...props}/>);
        expect(wrapper.find('.DealItem-tripText-5').at(0).text()).toBe('London');
        expect(wrapper.find('.DealItem-tripText-5').at(2).text()).toBe('10.00');
    });
});