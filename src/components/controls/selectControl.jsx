import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import _ from 'lodash';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const DropDown = ({ hintLabel, styles, menuItemChanged, defaultItemText, defaultItemValue, id, selectedValue, valuesList, label }) => (
    <div> 
        <InputLabel htmlFor="select">{hintLabel}</InputLabel>
        <Select 
            key={id}
            id={id}
            fullWidth={true}
            value={selectedValue}
            input={<Input id="select" />}
            onChange={e => {
                menuItemChanged(e.target.value);
            }}
            MenuProps={MenuProps}
        >
            {valuesList && _.map(valuesList, (item, index) => {
                return (
                    <MenuItem
                        key={index}
                        value={item}
                    >{item}</MenuItem>);
            })}
        </Select>
    </div>
   
);
