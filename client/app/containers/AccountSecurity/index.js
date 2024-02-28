/*
 *
 * AccountSecurity
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import ResetPasswordForm from '../../components/Common/ResetPasswordForm';
import { withTranslation } from "react-i18next";
class AccountSecurity extends React.PureComponent {
  componentDidMount() {}

  render() {
    const {
      resetFormData,
      formErrors,
      resetPasswordChange,
      resetAccountPassword,
      t,i18n
    } = this.props;

    return (
      <div className='account-security'>
        <SubPage title={t('accountSecurity')} isMenuOpen={null}>
          <div className='reset-form'>
            <h4>{i18n.t("resetPassword")}</h4>
            <ResetPasswordForm
              resetFormData={resetFormData}
              formErrors={formErrors}
              resetPasswordChange={resetPasswordChange}
              resetPassword={resetAccountPassword}
              i18n={i18n}
            />
          </div>
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.account.user,
    resetFormData: state.resetPassword.resetFormData,
    formErrors: state.resetPassword.formErrors
  };
};

export default withTranslation()(connect(mapStateToProps, actions)(AccountSecurity));
