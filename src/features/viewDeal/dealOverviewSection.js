import React from 'react';
import Box from '../../components/box/box';
import DealItem from './dealItem';
import Button from '@material-ui/core/Button';
import Refresh from '@material-ui/icons/Refresh';
import Paper from '@material-ui/core/Paper';
import './dealOverviewSection.css';
import currencyFormat from 'currency-formatter';

const calculateTotalByRoutes = routes => {
    let totalCost = 0;
    let totalTime = '';
    routes.forEach(route => {
        totalCost += route.cost;
    });

    return {
        time: totalTime,
        cost: totalCost
    };
};

class DealOverviewSection extends React.Component {
    render() {
        const {route, currency, actions, searchParams} = this.props;
        const dealsHTML = route.map((cityProp, index) =>
            <DealItem {...cityProp} currency={currency} key={index} searchParams={searchParams}/>);

        const total = calculateTotalByRoutes(route);
        return (
            <Box className='deal-section'>
                <div>
                    {dealsHTML.length > 0 ? dealsHTML : <div>There are no routes</div>}


                    <Paper className='deals-total'>
                        <span>Total</span>
                        <span>{total.time}</span>
                        <span>{currencyFormat.format(total.cost, {code: currency})}</span>
                    </Paper>

                    <Button variant="extendedFab" color="primary" onClick={() => {
                        actions.resetDeal();
                    }}>
                        <Refresh/>
                        Reset
                    </Button>
                </div>
            </Box>
        )
    }
}

export default DealOverviewSection; 