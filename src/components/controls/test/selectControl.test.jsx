import React from 'react';
import {mount} from 'enzyme';
import {DropDown} from '../selectControl';

describe('SelectControl', function () {
    describe('DropDown', function () {
        it('should render downdown', () => {
            const props = {
                valuesList: [
                    'Test',
                    'Test 2'
                ],
                selectedValue: 'Test'
            };

            const wrapper = mount(<DropDown {...props}/>);
            expect(wrapper.find('Select[value="Test"]').length).toBe(1);
            expect(wrapper.find('Menu[open=false]').length).toBe(1);
        });
    });
});