import React from 'react';
import SearchModule from '../features/searchDeal/searchModule';
import * as searchActions from '../features/searchDeal/searchActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import './searchPage.css';

class SearchPage extends React.Component {
    componentWillMount() {
        this.props.actions.travelDeals();
    }
    render() {
        return (
            <div className='search-page'>
                <div className='header'>
                    Travel Assist
                </div>
                <SearchModule/>
            </div>
        )
    }
}

export function mapStateToProps(state) {
    return {
      ...state
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
