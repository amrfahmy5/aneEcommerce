/**
 *
 * CartSummary
 *
 */

import React from "react";

import { Container, Row, Col } from "reactstrap";

const CartSummary = (props) => {
  const { cartTotal ,i18n,authenticated} = props;

  return (
    <div className={authenticated?'cart-summary':'d-none'}>
      <Container >
        {/* <Row className='mb-2 summary-item'>
          <Col xs='9'>
            <p className='summary-label'>Shippling</p>
          </Col>
          <Col xs='3' className='text-right'>
            <p className='summary-value'>...</p>
          </Col>
        </Row> */}
        <Row className='mb-2 summary-item'>
          <Col xs='9'>
            <p className='summary-label'>Total</p>
          </Col>
          <Col xs='3' className='text-right'>
            <p className='summary-value'>{authenticated?cartTotal:0} L.E</p>
          </Col>
        </Row>
        <div className="alert alert-primary" role="alert">
          {i18n.t("cartGuide")}
        </div>
      </Container>
    </div>
  );
};

export default CartSummary;
