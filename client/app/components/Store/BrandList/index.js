/**
 *
 * BrandList
 *
 */

import React from 'react';

import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { withTranslation } from "react-i18next";

const BrandList = props => {
  const { brands ,t,i18n } = props;

  return (
    <div className='brand-list'>
      <h3 className='text-uppercase'>{t("shopByBrand")}</h3>
      <hr />
      <Row className='flex-sm-row'>
        {brands.map((brand, index) => (
          <Col xs='6' md='4' lg='3' key={index} className='mb-3 px-2'>
            <Link
              to={`/shop/brand/${brand.slug}`}
              className='d-block brand-box'
            >
              <h5>{brand.name}</h5>
              <p className='brand-desc'>{i18n.language=="en"? brand.description:brand.descriptionAr}</p>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default withTranslation()(BrandList);
