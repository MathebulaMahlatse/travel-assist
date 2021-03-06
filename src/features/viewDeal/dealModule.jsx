import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dealOverviewSection from './dealOverviewSection';
import * as dealActions from './dealActions';


export function mapStateToProps(state) {
    const {data, app} = state;
    return {
        route: data.route,
        currency: data.deals.currency,
        searchParams: app.searchParams
    };
  }

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(dealActions, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(dealOverviewSection);