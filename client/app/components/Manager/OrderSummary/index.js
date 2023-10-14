/**
 *
 * OrderSummary
 *
 */

import React from 'react';

import { Col } from 'reactstrap';

const OrderSummary = props => {
  const { order } = props;

  return (
    <Col className='order-summary pt-3'>
      <h2>Order Summary</h2>
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Subtotal</p>
        <p className='summary-value ml-auto'>{order.total} L.E</p>
      </div>
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Est. Sales Tax</p>
        <p className='summary-value ml-auto'>{order.totalTax} L.E</p>
      </div>
      <hr />
      <div className='d-flex align-items-center summary-item'>
        <p className='summary-label'>Total</p>
        <p className='summary-value ml-auto'>{order.totalWithTax} L.E</p>
      </div>
    </Col>
  );
};

export default OrderSummary;
