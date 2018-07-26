import React from 'react';
import Box from '../../components/box/box';
import { Field, reduxForm } from 'redux-form';
import {DropDown} from '../../components/controls/selectControl';
import './searchForm.css';
import Button from '@material-ui/core/Button';
import Search from '@material-ui/icons/Search';

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

    render() {
        const { handleSubmit } = this.props;
        const {selectedFrom, selectedTo, selectedTripType} = this.state;
        const cities = this.props.cities ? this.props.cities.departure : [];
        const arrival = this.props.cities ? this.props.cities.arrival : [];
    
        return (
            <Box>
                <form onSubmit={handleSubmit} className='search-form'>
                    <div className='margin-bottom'>
                        <Field 
                            name="departure"
                            fullWidth={true} 
                            component={DropDown} 
                            valuesList={cities} 
                            hintLabel='Departure'
                            menuItemChanged={value => {
                                this.setState({
                                    selectedFrom: value
                                });
                            }}
                            selectedValue={selectedFrom}/>
                    </div>

                    <div className='margin-bottom'>
                        <Field 
                            name="destination"
                            fullWidth={true} 
                            component={DropDown} 
                            valuesList={arrival} 
                            hintLabel='Destination'
                            menuItemChanged={value => {
                                this.setState({
                                    selectedTo: value
                                });
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
                            }}
                            selectedValue={selectedTripType}/>
                    </div>

                    <Button variant="extendedFab" color="primary">
                            <Search/>
                        Search
                    </Button>
                </form>
            </Box>
        )
    }
}

SearchFormSection = reduxForm({
    form: 'search'
  })(SearchFormSection);

export default SearchFormSection;