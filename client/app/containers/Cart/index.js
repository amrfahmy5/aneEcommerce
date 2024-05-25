/*
 *
 * Cart
 *
 */

import React from 'react';
import { connect } from 'react-redux';

import actions from '../../actions';

import CartList from '../../components/Store/CartList';
import CartSummary from '../../components/Store/CartSummary';
import Checkout from '../../components/Store/Checkout';
import { BagIcon, CloseIcon } from '../../components/Common/Icon';
import Button from '../../components/Common/Button';
import { withTranslation } from "react-i18next";

class Cart extends React.PureComponent {
  render() {
    const {
      isCartOpen,
      cartItems,
      cartTotal,
      toggleCart,
      handleShopping,
      handleCheckout,
      handleRemoveFromCart,
      placeOrder,
      authenticated
      ,t,i18n
    } = this.props;

    return (
      <div className='cart'>
        
        <div className='cart-header'>
          {isCartOpen && (
            <Button
              borderless
              variant='empty'
              ariaLabel='close the cart'
              icon={<CloseIcon />}
              onClick={toggleCart}
            />
          )}
        </div>
        {cartItems.length > 0 ? (
          <div className='cart-body'>
            <CartList
              toggleCart={toggleCart}
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
              i18n={i18n}
              authenticated={authenticated}
            />
          </div>
        ) : (
          <div className='empty-cart'>
            <BagIcon />
            <p>{i18n.t("emptyShoppingCart")}</p>
          </div>
        )}
        {cartItems.length > 0 && (
          <div className='cart-checkout'>
            <CartSummary cartTotal={cartTotal} i18n={i18n} />
            <Checkout
              handleShopping={handleShopping}
              handleCheckout={handleCheckout}
              placeOrder={placeOrder}
              authenticated={authenticated}
              i18n={i18n}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isCartOpen: state.navigation.isCartOpen,
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartTotal,
    authenticated: state.authentication.authenticated
  };
};

export default withTranslation()(connect(mapStateToProps, actions)(Cart));
