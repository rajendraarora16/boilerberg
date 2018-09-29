import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { increment, startClock } from '../actions/appAction';
import { connect } from 'react-redux';
import Layout from '../components/layout';
import Page from '../components/page';

class Counter extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static async getInitialProps({ store }) {
    store.dispatch(increment());
  }

  componentDidMount() {
    this.props.dispatch(startClock());
  }

  render() {
    return (
      <Layout>
        <Page title="Order details" linkTo="/" />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  uData: state
});
export default connect(mapStateToProps)(Counter);
