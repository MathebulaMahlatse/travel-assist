import React from 'react';
import Box from '../../components/box/box';
import DealItem from './dealItem';
import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';

class DealOverviewSection extends React.Component {
    render() {
        const dealsHTML = this.props.route.map((cityProp, index) => {
            return (
                <DealItem {...cityProp} key={index}/>
            )
        });
        return (
            <Box>
                {dealsHTML.length > 0 ? dealsHTML : <div>There are no routes</div>}

                <Button variant="extendedFab" color="primary" onClick={() => {
                    this.props.actions.resetDeal();
                }}>
                            <Refresh/>
                        Reset
                    </Button>
            </Box>
        )
    }
}

export default DealOverviewSection; 