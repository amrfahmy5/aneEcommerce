/*
 *
 * Add
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import AddAddress from '../../components/Manager/AddAddress';
import SubPage from '../../components/Manager/SubPage';

import { withTranslation } from "react-i18next";

class Add extends React.PureComponent {
  render() {
    const {
      history,
      addressFormData,
      formErrors,
      addressChange,
      addAddress,
      t,i18n
    } = this.props;

    return (
      <SubPage
        title={t("addAddress")}
        actionTitle={t("cancel")}
        handleAction={() => history.goBack()}
      >
        <AddAddress
          addressFormData={addressFormData}
          formErrors={formErrors}
          addressChange={addressChange}
          addAddress={addAddress}
          i18n={i18n}
        />
      </SubPage>
    );
  }
}

const mapStateToProps = state => {
  return {
    addressFormData: state.address.addressFormData,
    formErrors: state.address.formErrors
  };
};

export default withTranslation()(connect(mapStateToProps, actions)(Add));
