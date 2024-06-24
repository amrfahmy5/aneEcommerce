/**
 *
 * ProductPage
 *
 */

import React from "react";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import actions from "../../actions";

import Input from "../../components/Common/Input";
import Button from "../../components/Common/Button";
import LoadingIndicator from "../../components/Common/LoadingIndicator";
import NotFound from "../../components/Common/NotFound";
import { BagIcon } from "../../components/Common/Icon";
import ProductReviews from "../../components/Store/ProductReviews";
import SocialShare from "../../components/Store/SocialShare";
import { withTranslation } from "react-i18next";

import CarouselSlider from "../../components/Common/CarouselSlider";
import { responsiveOneItemCarousel } from "../../components/Common/CarouselSlider/utils";
import { ROLES } from "../../constants";

class ProductPage extends React.PureComponent {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    // this.props.fetchStoreProduct(slug);
    this.props.fetchStoreProductwithImages(slug);
    this.props.fetchProductReviews(slug);
    document.body.classList.add("product-page");
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.slug !== prevProps.match.params.slug) {
      const slug = this.props.match.params.slug;
      this.props.fetchStoreProduct(slug);
    }
  }

  componentWillUnmount() {
    document.body.classList.remove("product-page");
  }

  render() {
    const {
      isLoading,
      product,
      productShopData,
      shopFormErrors,
      itemInCart,
      productShopChange,
      handleAddToCart,
      handleRemoveFromCart,
      addProductReview,
      reviewsSummary,
      reviews,
      reviewFormData,
      reviewChange,
      reviewFormErrors,
      t,
      i18n,
      user,
    } = this.props;
    const authenticated = user.firstName?true:false
    return (
      <div className="product-shop">
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? (
          <>
            <Row className="flex-row">
              <Col xs="12" md="5" lg="5" className="mb-3 px-3 px-md-2">
                <div className="position-relative">
                  {/* {product?.images == 0 ? ( */}
                  {/* <iframe
                      className="drive-image"
                      src={`https://drive.google.com/embeddedfolderview?id=${product.sku}#grid`}
                    ></iframe> */}
                  {/* ) : ( */}
                  <CarouselSlider
                    swipeable={true}
                    showDots={true}
                    infinite={true}
                    autoPlay={true}
                    slides={product.image}
                    responsive={responsiveOneItemCarousel}
                    autoPlaySpeed={5000}
                  >
                    {product.images.map((item, index) => (
                      // <img src={`https://drive.google.com/uc?id=${item}`} key={index} className="drive-image" />
                      <img src={`https://drive.google.com/thumbnail?id=${item}&sz=w1000`} key={index} className="drive-image" />
                      // <img crossorigin="anonymous"src={`https://drive.lienuc.com/uc?id=${item}`}alt="Contact Admin If Not Visible"className="drive-image" />
                      // <iframe src={`https://drive.google.com/file/d/${item}/preview`} key={index} className="drive-image" allow="autoplay"></iframe>
                    ))}
                  </CarouselSlider>
                  {/* )} */}

                  {product.inventory <= 0 && !shopFormErrors["quantity"] ? (
                    <p className="stock out-of-stock">{t("outOfStock")}</p>
                  ) : (
                    <p className="stock in-stock">{t("inStock")}</p>
                  )}
                </div>
              </Col>
              <Col xs="12" md="7" lg="7" className="mb-3 px-3 px-md-2">
                <div className="product-container">
                  <div className="item-box">
                    <div className="item-details">
                      <h1 className="item-name one-line-ellipsis">
                        {i18n.language.includes("en")
                          ? product.name
                          : product.nameAr}
                      </h1>
                      {user?.role === ROLES.Admin ? (
                        <p className="sku">
                          <a
                            href={`https://drive.google.com/drive/folders/${product.sku}`}
                            className=""
                            target="_blank"
                          >
                            {product.sku}
                          </a>
                        </p>
                      ) : (
                        ""
                      )}

                      <hr />
                      {product.brand && (
                        <p className="by">
                          {t("seeMoreFrom")}{" "}
                          <Link
                            to={`/shop/brand/${product.brand.name}`}
                            className="default-link"
                          >
                            {product.brand.name}
                          </Link>
                        </p>
                      )}
                      <p className="item-desc">
                        {i18n.language.includes("en")
                          ? product.description
                          : product.descriptionAr}
                      </p>
                      <p className='price'>{authenticated?product.price +" L.E":""}</p>
                    </div>
                    <div className="item-customize">
                      <Input
                        type={"number"}
                        error={shopFormErrors["quantity"]}
                        label={t("quantity")}
                        name={"quantity"}
                        decimals={false}
                        min={1}
                        max={product.inventory}
                        placeholder={t("productQuantity")}
                        disabled={
                          product.inventory <= 0 && !shopFormErrors["quantity"]
                        }
                        value={productShopData.quantity}
                        onInputChange={(name, value) => {
                          productShopChange(name, value);
                        }}
                      />
                    </div>
                    <div className="my-4 item-share">
                      <SocialShare product={product} />
                    </div>
                    <div className="item-actions">
                      {itemInCart ? (
                        <Button
                          variant="primary"
                          disabled={
                            product.inventory <= 0 &&
                            !shopFormErrors["quantity"]
                          }
                          text={t("removeFromBag")}
                          className="bag-btn"
                          icon={<BagIcon />}
                          onClick={() => handleRemoveFromCart(product)}
                        />
                      ) : (
                        <Button
                          variant="primary"
                          disabled={
                            product.quantity <= 0 && !shopFormErrors["quantity"]
                          }
                          // text="Add To Bag"
                          text={t("requestQuatation")}
                          className="bag-btn"
                          icon={<BagIcon />}
                          // icon={<span className="fa fa-shopping-cart fa-lg"></span>}

                          onClick={() => handleAddToCart(product)}
                        />
                      )}
                    </div>
                    <div className="alert alert-primary" role="alert">
                      {t("orderGuide")}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <ProductReviews
              reviewFormData={reviewFormData}
              reviewFormErrors={reviewFormErrors}
              reviews={reviews}
              reviewsSummary={reviewsSummary}
              reviewChange={reviewChange}
              addReview={addProductReview}
              i18n={i18n}
            />
          </>
        ) : (
          <NotFound message={t("noProductFound")} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const itemInCart = state.cart.cartItems.find(
    (item) => item._id === state.product.storeProduct._id
  )
    ? true
    : false;

  return {
    product: state.product.storeProduct,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    isLoading: state.product.isLoading,
    reviews: state.review.productReviews,
    reviewsSummary: state.review.reviewsSummary,
    reviewFormData: state.review.reviewFormData,
    reviewFormErrors: state.review.reviewFormErrors,
    itemInCart,
    user: state.account.user,
  };
};

export default withTranslation()(
  connect(mapStateToProps, actions)(ProductPage)
);
