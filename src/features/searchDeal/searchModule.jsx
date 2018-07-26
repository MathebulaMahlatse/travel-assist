import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchFormSection from './searchFormSection';
import * as searchActions from './searchActions';


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
  )(SearchFormSection);