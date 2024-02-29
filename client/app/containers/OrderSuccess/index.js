/*
 *
 * OrderSuccess
 *
 */

import React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import actions from '../../actions';

import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { withTranslation } from "react-i18next";

class OrderSuccess extends React.PureComponent {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchOrder(id);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      const id = this.props.match.params.id;
      this.props.fetchOrder(id);
    }
  }

  render() {
    const { order, isLoading , t , i18n } = this.props;

    return (
      <div className='order-success'>
        {isLoading ? (
          <LoadingIndicator />
        ) : order._id ? (
          <div className='order-message'>
            <h2>{t("orderThanks")}</h2>
            <p>
              {t("order")}{' '}
              <Link
                to={{
                  pathname: `/order/${order._id}?success`,
                  state: { prevPath: location.pathname }
                }}
                // to={`/order/${order._id}?success`}
                className='order-label'
              >
                #{order._id}
              </Link>{' '}
              {t("isComplete")}
            </p>
            {/* <p>A confirmation email will be sent to you shortly.</p> */}
            <p>{t("willcall")}</p>

            <div className='order-success-actions'>
              <Link to='/dashboard/orders' className='btn-link'>
                {t("manageOrders")}
              </Link>
              <Link to='/shop' className='btn-link shopping-btn'>
                {t("conShopping")}
              </Link>
            </div>
          </div>
        ) : (
          <NotFound message='No order found.' />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    order: state.order.order,
    isLoading: state.order.isLoading
  };
};

export default withTranslation()(connect(mapStateToProps, actions)(OrderSuccess));
