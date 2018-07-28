import React from 'react';
import Box from '../../components/box/box';
import { Field, reduxForm } from 'redux-form';
import {DropDown} from '../../components/controls/selectControl';
import './searchForm.css';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';
import {connect} from "react-redux";

const tripType = [
    'Cheapest',
    'Fastest'
]
class SearchFormSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedFrom: '',
            selectedTo: '',
            selectedTripType: 'Cheapest'
        }
    }

    submit(values) {
        this.props.actions.findRoutesToArrival(values['departure'], values['arrival'], 'Cheapest')
    }

    render() {
        const { handleSubmit, dispatch, blur, errors } = this.props;
        const {selectedFrom, selectedTo, selectedTripType} = this.state;
        const cities = this.props.cities ? this.props.cities.departure : [];
        const arrival = this.props.cities ? this.props.cities.arrival : [];

        return (
            <Box>
                <form onSubmit={handleSubmit((values) => {this.submit(values)})} className='search-form'>
                    <div className='margin-bottom'>
                        <Field 
                            name="departure"
                            fullWidth={true} 
                            component={DropDown} 
                            valuesList={cities} 
                            hintLabel='Departure'
                            error={errors && errors['departure']}
                            menuItemChanged={value => {
                                this.setState({
                                    selectedFrom: value
                                });

                                dispatch(blur('departure', value));
                            }}
                            selectedValue={selectedFrom}/>
                    </div>

                    <div className='margin-bottom'>
                        <Field 
                            name="arrival"
                            fullWidth={true} 
                            component={DropDown} 
                            valuesList={arrival} 
                            hintLabel='Arrival'
                            error={errors && errors['arrival']}
                            menuItemChanged={value => {
                                this.setState({
                                    selectedTo: value
                                });

                                dispatch(blur('arrival', value));
                            }}
                            selectedValue={selectedTo}/>
                    </div>

                    <div className='margin-bottom'>
                        <Field 
                            name="tripType" 
                            fullWidth={true} 
                            component={DropDown} 
                            valuesList={tripType} 
                            hintLabel='Trip type'
                            menuItemChanged={value => {
                                this.setState({
                                    selectedTripType: value
                                });

                                dispatch(blur('tripType', value));
                            }}
                            selectedValue={selectedTripType}/>
                    </div>

                    <Button variant="extendedFab" color="primary" type='submit'>
                            <Search/>
                        Search
                    </Button>
                </form>
            </Box>
        )
    }
}

const mapStateToProps = (state) => {
    const errors = state && state.form && state.form['search'] && state.form['search'].syncErrors;
    return {
        initialValues: {
            tripType: 'Cheapest'
        },
        errors
    }
};

const validate = (values) => {
    const errors = {};
    const requiredValues = ['departure', 'arrival'];

    requiredValues.forEach(key => {
        if(!values[key] || values[key].length === 0) {
            errors[key] = 'This field is required';
        }
    });

    return errors;
};

export default connect(mapStateToProps) (reduxForm({
    form: 'search',
    validate
})(SearchFormSection));