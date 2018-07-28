import React from 'react';
import SearchModule from '../features/searchDeal/searchModule';
import DealModule from '../features/viewDeal/dealModule';
import * as searchActions from '../features/searchDeal/searchActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './searchPage.css';

class SearchPage extends React.Component {
    componentWillMount() {
        this.props.actions.travelDeals();
    }
    render() {
        const {searchSuccess} = this.props;
        return (
            <div className='search-page'>
                <div className='header'>
                    Travel Assist
                </div>
                {searchSuccess ? <DealModule/> : <SearchModule/> }
            </div>
        )
    }
}

export function mapStateToProps(state) {
    return {
        searchSuccess: state.app.searchSuccess
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(searchActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchPage);
