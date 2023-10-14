/**
 *
 * MiniCategory
 *
 */

import React from 'react';

import { Link } from 'react-router-dom';

const MiniBrand = props => {
  const { categories, toggleCategory } = props;

  const handleMenuItemClick = () => {
    toggleCategory();
  };

  return (
    <div className='mini-brand-list'>
      <div className='d-flex align-items-center justify-content-between min-brand-title'>
        <h4 className='mb-0 text-uppercase'>Shop By Category</h4>
        {/* <Link
          to={'/cateory'}
          className='redirect-link'
          role='menuitem'
          onClick={handleMenuItemClick}
        >
          See all
        </Link> */}
      </div>
      <div className='mini-brand-block'>
        {categories.map((category, index) => (
          <div key={index} className='brand-item'>
            <Link
              to={`/shop/category/${category.slug}`}
              className='brand-link'
              role='menuitem'
              onClick={handleMenuItemClick}
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniBrand;