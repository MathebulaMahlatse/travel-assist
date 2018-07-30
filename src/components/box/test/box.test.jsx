import React from 'react';
import Box from '../box';
import {shallow} from 'enzyme';

describe('Box', function () {
    it('should render box with children', () => {
        const props = () => (
            <div>Test</div>
        );
        const wrapper = shallow(<Box children={props()}/>);
        expect(wrapper.find('div').text()).toBe('Test')
    });
});