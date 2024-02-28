/**
 *
 * Checkout
 *
 */

import React from 'react';

import Button from '../../Common/Button';

const Checkout = props => {
  const { authenticated, handleShopping, handleCheckout, placeOrder ,i18n} = props;

  return (
    <div className='easy-checkout'>
      <div className='checkout-actions infoBlue'>
        <Button
          variant='primary'
          text={i18n.t("conShopping")}
          onClick={() => handleShopping()}
        />
        {authenticated ? (
          <Button
            variant='primary'
            text={i18n.t("confirm")}
            onClick={() => placeOrder()}
          />
        ) : (
          <Button
            variant='primary'
            // text='Proceed To Checkout'
            text={i18n.t("loginThenConfirm")}
            onClick={() => handleCheckout()}
          />
        )}
      </div>
    </div>
  );
};

export default Checkout;
