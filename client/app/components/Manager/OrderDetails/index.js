/**
 *
 * OrderDetails
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';

import OrderMeta from '../OrderMeta';
import OrderItems from '../OrderItems';
import OrderSummary from '../OrderSummary';

const OrderDetails = props => {
  const { order, user, cancelOrder, updateOrderItemStatus, onBack , i18n} = props;
  return (
    <div className='order-details'>
      <Row>
        <Col xs='12' md='12'>
          <OrderMeta order={order} cancelOrder={cancelOrder} onBack={onBack} i18n={i18n} />
        </Col>
      </Row>
      <Row className='mt-5'>
        <Col xs='12' lg='12'>
          <OrderItems
            order={order}
            user={user}
            updateOrderItemStatus={updateOrderItemStatus}
            i18n={i18n}
          />
        </Col>
        {/* <Col xs='12' lg='4' className='mt-5 mt-lg-0'>
          <OrderSummary order={order} i18n={i18n}/>
        </Col> */}
      </Row>
    </div>
  );
};

export default OrderDetails;
