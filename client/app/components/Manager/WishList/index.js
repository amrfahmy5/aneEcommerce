/**
 *
 * WishList
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

import { formatDate } from '../../../utils/date';
import Button from '../../Common/Button';
import { XIcon } from '../../Common/Icon';

const WishList = props => {
  const { wishlist, updateWishlist,i18n } = props;

  const getProductImage = item => {
    if (item.product) {
      const product = item.product;
      return (
        <div className='d-flex flex-column justify-content-center align-items-center'>
          <img
            className='item-image'
            src={`${
              product.imageUrl
                ? product.imageUrl
                : '/images/placeholder-image.png'
            }`}
          />
        </div>
      );
    }
  };

  return (
    <div className='w-list'>
      {wishlist.map((item, index) => (
        <div
          key={index}
          className='d-flex flex-row align-items-center mx-0 mb-3 wishlist-box'
        >
          <Link
            to={`/product/${item.product.slug}`}
            key={index}
            className='d-flex flex-1 align-items-center text-truncate'
          >
            {getProductImage(item)}
            <div className='d-flex flex-column justify-content-center px-3 text-truncate'>
              <h4 className='text-truncate'>{i18n.language.includes("en")?item.product.name:item.product.nameAr}</h4>
              {/* <p className='mb-2 price'>{item.product.price} L.E</p> */}
              <label className='text-truncate'>{`${i18n.t("wishlistDate")} ${formatDate(
                item.created
              )}`}</label>
            </div>
          </Link>
          <div className='remove-wishlist-box'>
            <Button
              variant='danger'
              icon={<XIcon className='text-white' width={15} />}
              round={20}
              onClick={e => {
                updateWishlist(!item.isLiked, item.product._id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default WishList;
