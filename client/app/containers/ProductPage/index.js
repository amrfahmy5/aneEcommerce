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

class ProductPage extends React.PureComponent {
  // state = { loading: false };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.fetchStoreProduct(slug);
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

  async getImages() {
    const apiKey = "AIzaSyBbMQiJJ2lbH8wnqoT0cnCPhdROqes6nyE";
    const folderId = "1BZ-bxxyaS4Q7jHAXUnN3nefq9lY9g6iC";
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`;

    try {
      this.setState({ loading: true });
      const response = await fetch(apiUrl);
      const data = await response.json();
      const files = data.files.filter((file) =>
        file.mimeType.startsWith("image/")
      );
      this.setState({
        productImages: files.map((image) => {
          return `https://drive.google.com/thumbnail?id=${image.id}`;
        }),
      });
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      this.setState({ loading: false });
    }
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
    } = this.props;

    // this.getImages();
    
    return (
      <div className="product-shop">
        {isLoading ? (
          <LoadingIndicator />
        ) : Object.keys(product).length > 0 ? (
          <>
            <Row className="flex-row">
              <Col xs="12" md="5" lg="5" className="mb-3 px-3 px-md-2">
                <div className="position-relative">
                  <iframe
                    className="driveImage"
                    src={`https://drive.google.com/embeddedfolderview?id=${product.sku}#grid`}
                    // allowfullscreen
                  ></iframe>

                  {/* <CarouselSlider
                    swipeable={true}
                    showDots={false}
                    infinite={true}
                    autoPlay={true}
                    slides={this.state.productImages}
                    responsive={responsiveOneItemCarousel}
                  >
                    {this.state.productImages.map((item, index) => (
                      <img key={index} src={item} />
                    ))}
                  </CarouselSlider> */}

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
                      <p className="sku">{product.sku}</p>
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
                      {/* <p className='price'>{product.price} L.E</p> */}
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
  };
};

export default withTranslation()(
  connect(mapStateToProps, actions)(ProductPage)
);
