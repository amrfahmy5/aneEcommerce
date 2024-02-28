/**
 *
 * NavigationMenu
 *
 */

import React from 'react';
import { withTranslation } from "react-i18next";
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Container } from 'reactstrap';

import actions from '../../actions';

import Button from '../../components/Common/Button';
import { CloseIcon } from '../../components/Common/Icon';

class NavigationMenu extends React.PureComponent {
  render() {
    const { isMenuOpen, categories, toggleMenu ,brands ,t,i18n} = this.props;
    const handleCategoryClick = () => {
      this.props.toggleMenu();
    };

    return (
      <div className='navigation-menu'>
        <div className='menu-header'>
          {isMenuOpen && (
            <Button
              borderless
              variant='empty'
              ariaLabel='close the menu'
              icon={<CloseIcon />}
              onClick={toggleMenu}
            />
          )}
        </div>
        <div className='menu-body'>
          <Container>
            <h3 className='menu-title'>{t("shopByCategory")}</h3>
            <nav role='navigation'>
              <ul className='menu-list'>
                {categories.map((link, index) => (
                  <li key={index} className='menu-item'>
                    <NavLink
                      onClick={handleCategoryClick}
                      to={'/shop/category/' + link.slug}
                      activeClassName='active-link'
                      exact
                    >
                      {i18n.language?link.name:link.nameAr}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <h3 className='menu-title'>{t("shopByBrand")}</h3>
             <nav role='navigation'>
              <ul className='menu-list'>
                {brands.map((link, index) => (
                  <li key={index} className='menu-item'>
                    <NavLink
                      onClick={handleCategoryClick}
                      to={'/shop/brand/' + link.slug}
                      activeClassName='active-link'
                      exact
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    categories: state.category.storeCategories ,
    brands: state.brand.storeBrands,
  };
};

export default withTranslation()(connect(mapStateToProps, actions)(NavigationMenu));
