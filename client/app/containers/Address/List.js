/*
 *
 * List
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddressList from '../../components/Manager/AddressList';
import SubPage from '../../components/Manager/SubPage';
import NotFound from '../../components/Common/NotFound';
import { withTranslation } from "react-i18next";

class List extends React.PureComponent {
  componentDidMount() {
    this.props.fetchAddresses();
  }

  render() {
    const { history, addresses,t,i18n } = this.props;

    return (
      <>
        <SubPage
          title={t("address")}
          actionTitle={t("add")}
          handleAction={() => history.push('/dashboard/address/add')}
        >
          {addresses.length > 0 ? (
            <AddressList addresses={addresses} i18n={i18n} />
          ) : (
            <NotFound message='No addresses found.' />
          )}
        </SubPage>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    addresses: state.address.addresses
  };
};

export default withTranslation()(connect(mapStateToProps, actions)(List));
