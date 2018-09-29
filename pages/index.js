import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { increment, loadData, startClock } from '../actions/appAction';
import Layout from '../components/layout';
import Page from '../components/page';

class Counter extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static async getInitialProps({ store }) {
    store.dispatch(increment());
    if (!store.getState().placeholderData) {
      store.dispatch(loadData());
    }
  }

  componentDidMount() {
    this.props.dispatch(startClock());
  }

  render() {
    return (
      <Layout>
        <Page title="Merchandise" linkTo="/other" />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  uData: state
});
export default connect(mapStateToProps)(Counter);
