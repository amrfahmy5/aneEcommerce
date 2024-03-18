/**
 *
 * ProductList
 *
 */

import React from "react";

import { Link } from "react-router-dom";

import AddToWishList from "../AddToWishList";
import { withTranslation } from "react-i18next";

const ProductList = (props) => {
  const { products, updateWishlist, authenticated, t, i18n } = props;

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div key={index} className="mb-3 mb-md-0">
          <div className="product-container">
            <div className="item-box">

              <div className="add-wishlist-box">
                <AddToWishList
                  id={product._id}
                  liked={product?.isLiked ?? false}
                  enabled={authenticated}
                  updateWishlist={updateWishlist}
                  authenticated={authenticated}
                />
              </div>

              <div className="product-status">
              {product.taxable?<span class="badge badge-danger">{t("new")}</span>:<span class="badge badge-primary">{t("used")}</span>}
                
              
              </div>


              <div className="item-link">
                <Link
                  to={`/product/${product.slug}`}
                  className="d-flex flex-column h-100"
                >
                  <div className="item-image-container">
                    <div className="item-image-box">
                      <img
                        className="item-image"
                        src={`${
                          product.imageUrl
                            ? product.imageUrl
                            : "/images/placeholder-image.png"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="item-body">
                    <div className="item-details p-3">
                      <h1 className="item-name">
                        {i18n.language.includes("en")
                          ? product.name
                          : product.nameAr}
                      </h1>
                      {product.brand &&
                        Object.keys(product.brand).length > 0 && (
                          <p className="by">
                            By <span>{product.brand.name}</span>
                          </p>
                        )}
                      <p className="item-desc mb-0">
                        {i18n.language.includes("en")
                          ? product.description
                          : product.descriptionAr}
                      </p>
                    </div>
                  </div>

                  {/* <p className='price mb-0'>{product.price} L.E</p> */}
                  {/* <p className='price mb-0'>Call Us </p> */}

                  {product.totalReviews > 0 && (
                    <div className="d-flex flex-row justify-content-between align-items-center px-4 mb-2 item-footer">
                      <p className="mb-0">
                        <span className="fs-16 fw-normal mr-1">
                          {parseFloat(product?.averageRating).toFixed(1)}
                        </span>
                        <span
                          className={`fa fa-star ${
                            product.totalReviews !== 0 ? "checked" : ""
                          }`}
                          style={{ color: "#ffb302" }}
                        ></span>
                      </p>
                    </div>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default withTranslation()(ProductList);
