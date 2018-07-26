import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dealOverviewSection from './dealOverviewSection';
import * as searchActions from '../searchDeal/searchActions';


export function mapStateToProps(state) {
    return {
      cities: state.data.cities
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
  )(dealOverviewSection);