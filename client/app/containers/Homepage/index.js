/**
 *
 * Homepage
 *
 */




import React from 'react';

import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import actions from '../../actions';
import banners from './banners.json';
import brands from './brands.json';
import customerLogo from './customerLogo.json';

import CarouselSlider from '../../components/Common/CarouselSlider';
import { responsiveOneItemCarousel } from '../../components/Common/CarouselSlider/utils';


import { Switch, Route } from 'react-router-dom';

import ProductsShop from '../ProductsShop';
import Page404 from '../../components/Common/Page404';
import ProductFilter from '../../components/Store/ProductFilter';

import { withTranslation } from "react-i18next";

class Homepage extends React.PureComponent {
  render() {
    let { products, filterProducts ,t,i18n } = this.props;
    return (
      <div className='homepage'>
        <Row className='flex-row'>
          <Col xs='12' lg='10' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='home-carousel'>
              <CarouselSlider
                swipeable={true}
                showDots={true}
                infinite={true}
                autoPlay={true}
                slides={banners}
                responsive={responsiveOneItemCarousel}
              >
                {banners.map((item, index) => (
                  <img key={index} src={item.imageUrl} />
                ))}
              </CarouselSlider>
            </div>
          </Col>
        </Row>

         {/* products */}
         <Row xs='12' className='mt-5'>

          <Col
            xs={{ size: 12, order: 2 }}
            sm={{ size: 12, order: 2 }}
            md={{ size: 12, order: 2 }}
            lg={{ size: 12, order: 2 }}
          >
            <Switch>
              <Route exact path='/' component={ProductsShop} />
              <Route path='*' component={Page404} />
            </Switch>
          </Col>
        </Row>
        {/* more product */}
        <Row xs="12" className='infoBlue align-items-center mx-0 mt-7 mt-lg-4 py-3 py-lg-3 text-center'>
          <Col>
            <a href='/shop'><span class="infoBlue">{t("moreProduct")}</span></a>
          </Col>
        </Row>

        {/* brand and customer */}
        <Row className='flex-row my-2'>
          <Col xs='6' lg='6' className='order-lg-1 mb-3 px-3 px-md-2'>
          <div className='d-flex flex-column h-100 justify-content-between brands text-center'>
                <div class="shadow p-2 mb-1 rounded info">
                  {t("ourBrand")}
                </div>
                <CarouselSlider
                  swipeable={true}
                  showDots={false}
                  infinite={true}
                  autoPlay={true}
                  slides={banners}
                  responsive={responsiveOneItemCarousel}
                >
                  {brands.map((item, index) => (
                    <img key={index} src={item.imageUrl} />
                  ))}
                </CarouselSlider>
              </div>
          </Col>

          <Col xs='6' lg='6' className='order-lg-1 mb-3 px-3 px-md-2'>
            <div className='d-flex flex-column h-100 justify-content-between brands'>
             
             
             
              {/* customers */}
              <div className='text-center'>
                <div class="shadow p-2 mb-1 rounded info">
                  {t("ourCustomer")}
                </div>
                <CarouselSlider
                  swipeable={true}
                  showDots={false}
                  infinite={true}
                  autoPlay={true}
                  slides={customerLogo}
                  responsive={responsiveOneItemCarousel}
                >
                  {customerLogo.map((item, index) => (
                    <img key={index} src={item.imageUrl} />
                  ))}
                </CarouselSlider>
              </div>

            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.storeProducts
  };
};

export default withTranslation()(connect(mapStateToProps, actions)(Homepage));
