import React from 'react';
import Box from '../../components/box/box';
import DealItem from './dealItem';
import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';

const deal = {
    departure: 'London',
    destination: 'Paris',
    amount: '10$',
    transportType: 'train',
    reference: 'AB123',
    time: '02h15'
}
class DealOverviewSection extends React.Component {
    render() {
        return (
            <Box>
                <DealItem {...deal}/>
                <DealItem {...deal}/>
                <DealItem {...deal}/>

                <Button variant="extendedFab" color="primary">
                            <Refresh/>
                        Reset
                    </Button>
            </Box>
        )
    }
}

export default DealOverviewSection; 