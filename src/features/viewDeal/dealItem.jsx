import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import ChevronRight from '@material-ui/icons/ChevronRight';
import DirectionsBus from '@material-ui/icons/DirectionsBus';
import Train from '@material-ui/icons/Train';
import DirectionsCar from '@material-ui/icons/DirectionsCar';
import LastPage from '@material-ui/icons/LastPage';
import Tooltip from '@material-ui/core/Tooltip';
import currencyFormat from 'currency-formatter';

const styles = () => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        margin: '1em',
        padding: '1em',
        backgroundColor: '#eeeeee'
    },
    flexRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    svg: {
        fontSize: '1.2em'
    },
    right: {
        marginLeft: 'auto'
    },
    tripText: {
        fontWeight: 'bold',
        padding: '0.1em'
    },
    textPadding: {
        padding: '0.1em',
        fontStyle: 'italic',
        fontSize: '0.8em'
    }
  });


const getTransportIcon = (transportType, className) => {
    if(transportType === 'train')
        return <Train className={className}/>;
    else if(transportType === 'bus')
        return <DirectionsBus className={className}/>;
    else {
        return <DirectionsCar className={className}/>
    }
}

const DealItem = props => {
    return (
        <Paper className={props.classes.root}>
            <div className={props.classes.flexRow}>
                <div className={props.classes.tripText}>{props.departure}</div>

                {props.searchParams.arrival !== props.arrival ?
                    <ChevronRight className={props.classes.svg}/> :
                    <LastPage className={props.classes.svg}/>
                }
                <div className={props.classes.tripText}>{props.arrival}</div>
                <Tooltip title={`A discount of ${props.discount} was applied to this trip`} placement="top-start">
                    <div className={`${props.classes.right} ${props.classes.tripText}`}>{currencyFormat.format(props.cost, {code: props.currency})}</div>
                </Tooltip>

            </div>

            <div className={`${props.classes.flexRow} ${props.classes.textPadding}`}>
                {getTransportIcon(props.transport, props.classes.svg)}
                <div id='ref'>{props.reference} for {props.duration.h}h{props.duration.m}</div>
            </div>
        </Paper>
    );
}

export default withStyles(styles) (DealItem);