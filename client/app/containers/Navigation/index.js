/**
 *
 * Navigation
 *
 */

import React from "react";

import { connect } from "react-redux";
import { Link, NavLink as ActiveLink, withRouter } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import actions from "../../actions";

import Button from "../../components/Common/Button";
import Select from "react-select";

import CartIcon from "../../components/Common/CartIcon";
import { BarsIcon } from "../../components/Common/Icon";
import MiniBrand from "../../components/Store//MiniBrand";
import MiniCategory from "../../components/Store//MiniCategory";

import ChatWidget from "../../components/Store/conntact";

import Menu from "../NavigationMenu";
import Cart from "../Cart";

import { withTranslation } from "react-i18next";

// import i18n from "i18next";

class Navigation extends React.PureComponent {
  componentDidMount() {
    this.props.fetchStoreBrands();
    this.props.fetchStoreCategories();
  }

  toggleBrand() {
    this.props.fetchStoreBrands();
    this.props.toggleBrand();
  }

  toggleCategory() {
    this.props.fetchStoreCategories();
    this.props.toggleCategory();
  }

  toggleMenu() {
    this.props.fetchStoreCategories();
    this.props.toggleMenu();
  }

  getSuggestionValue(suggestion) {
    return suggestion.name;
  }

  renderSuggestion(suggestion, { query, isHighlighted }) {
    const BoldName = (suggestion, query) => {
      const matches = AutosuggestHighlightMatch(suggestion.nameAr, query);
      const parts = AutosuggestHighlightParse(suggestion.nameAr, matches);

      return (
        <div>
          {parts.map((part, index) => {
            const className = part.highlight
              ? "react-autosuggest__suggestion-match"
              : null;
            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
        </div>
      );
    };

    return (
      <Link to={`/product/${suggestion.slug}`}>
        <div className="d-flex">
          <img
            className="item-image"
            src={`${
              suggestion.imageUrl
                ? suggestion.imageUrl
                : "/images/placeholder-image.png"
            }`}
          />
          <div>
            <Container>
              <Row>
                <Col>
                  <span className="name">{BoldName(suggestion, query)}</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  {/* <span className="price">{suggestion.price} L.E</span> */}
                  <span className="price">by {suggestion.brand.slug}</span>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </Link>
    );
  }

  render() {
    const langOptions = [
      {
        value: "en-US",
        label: " English",
        image: "/images/flag-usa.jpg",
      },
      { value: "ar", label: "Ar/عربى", image: "/images/flag-eg.svg" },
    ];
    const {
      history,
      authenticated,
      user,
      cartItems,
      brands,
      categories,
      signOut,
      isMenuOpen,
      isCartOpen,
      isBrandOpen,
      isCategoryOpen,
      toggleCart,
      toggleMenu,
      searchValue,
      suggestions,
      onSearch,
      onSuggestionsFetchRequested,
      onSuggestionsClearRequested,
      t,
      i18n,
    } = this.props;
    const inputProps = {
      placeholder: t("searchProducts"),
      value: searchValue,
      onChange: (_, { newValue }) => {
        onSearch(newValue);
      },
    };
// fixed-mobile-header
    return (
      <header className="header">
        <div className="header-info">
          <Container>
            <Row>
              <Col md="4" className="text-center d-none d-md-block">
                <span className="slogn">As Good As Gold</span>
              </Col>
              <Col xs="7" className="text-center d-block d-md-none">
                <span className="slognMobile">As Good As Gold</span>
              </Col>
              <Col
                md="4"
                className="text-center d-none d-md-block align-items-center mt-1"
              >
                <i className="fa-solid fa-phone-volume"></i>
                <a href="tel:01118122288">
                  <span> {t("call")}</span>
                </a>
              </Col>

              <Col md="4" xs="5" className="text-center">
                <Select
                  // isDisabled={disabled}
                  className="select-container langSelect"
                  classNamePrefix="react-select"
                  options={langOptions}
                  value={langOptions[i18n.language.includes("en") ? 0 : 1]}
                  onChange={(value) => i18n.changeLanguage(value.value)}
                  formatOptionLabel={(lang) => (
                    <div className="country-option">
                      <img src={lang.image} alt="country-image" />
                      <span>{lang.label}</span>
                    </div>
                  )}
                />
              </Col>
            </Row>
          </Container>
        </div>

        <Container>
          <Row className="align-items-center top-header">
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 3, order: 1 }}
              lg={{ size: 2, order: 1 }}
              className="pr-0"
            >
              <div className="brand">
                <Link to="/">
                  {/* <h1 className="logo">{t("logo")}</h1> */}
                  <img height="40rem" src="/images/headerLogoWhite.png" />
                </Link>
              </div>
            </Col>
            {/* Search */}
            <Col
              xs={{ size: 12, order: 4 }}
              sm={{ size: 12, order: 4 }}
              md={{ size: 12, order: 4 }}
              lg={{ size: 4, order: 3 }}
              className="pt-2 pt-lg-0"
            >
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={(_, item) => {
                  history.push(`/product/${item.suggestion.slug}`);
                }}
              />
            </Col>
            {/* Bar */}
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 4, order: 1 }}
              lg={{ size: 4, order: 3 }}
              className="desktop-hidden"
            >
              <div className="header-links">
                <Button
                  borderless
                  variant="empty"
                  ariaLabel="open the menu"
                  icon={<BarsIcon />}
                  onClick={() => this.toggleMenu()}
                />
                <CartIcon cartItems={cartItems} onClick={toggleCart} />
              </div>
            </Col>

            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 9, order: 1 }}
              lg={{ size: 6, order: 3 }}
              // className='px-0'
            >
              <Navbar color="light" light expand="md" className="mt-1 mt-md-0">
                <Nav navbar>
                  {/* cart */}
                  <NavItem>
                    <CartIcon
                      className="d-none d-md-block"
                      cartItems={cartItems}
                      onClick={toggleCart}
                    />
                  </NavItem>

                  {brands && brands.length > 0 && (
                    <Dropdown
                      nav
                      inNavbar
                      toggle={() => this.toggleBrand()}
                      isOpen={isBrandOpen}
                      className="d-none d-md-block"
                    >
                      <DropdownToggle nav>
                        <span className="NavTitle">{t("brands")}</span>

                        <span className="fa fa-chevron-down dropdown-caret"></span>
                      </DropdownToggle>
                      <DropdownMenu right={false} className="nav-brand-dropdown">
                        <div className="mini-brand">
                          <MiniBrand
                            brands={brands}
                            toggleBrand={() => this.toggleBrand()}
                          />
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  )}

                  {categories && categories.length > 0 && (
                    <Dropdown
                      nav
                      inNavbar
                      toggle={() => this.toggleCategory()}
                      isOpen={isCategoryOpen}
                      className="d-none d-md-block"
                    >
                      <DropdownToggle nav>
                        <span className="NavTitle">{t("categories")}</span>

                        <span className="fa fa-chevron-down dropdown-caret"></span>
                      </DropdownToggle>
                      <DropdownMenu right={false} className="nav-brand-dropdown">
                        <div className="mini-brand">
                          <MiniCategory
                            categories={categories}
                            toggleCategory={() => this.toggleCategory()}
                          />
                        </div>
                      </DropdownMenu>
                    </Dropdown>
                  )}

                  {/* shop */}
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to="/shop"
                      activeClassName="active"
                    >
                      <span className="NavTitle">{t("shop")}</span>
                    </NavLink>
                  </NavItem>

                  {/* login - logout - signup - dashboard - welcome */}
                  {authenticated ? (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        <span className="NavTitle">
                          {user.firstName ? user.firstName : "Welcome"}
                        </span>

                        <span className="fa fa-chevron-down dropdown-caret"></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem
                          onClick={() => history.push("/dashboard")}
                        >
                          {t("dashboard")}
                        </DropdownItem>
                        <DropdownItem onClick={signOut}>
                          {t("signOut")}
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  ) : (
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        <span className="NavTitle">{t("login")}</span>

                        <span className="fa fa-chevron-down dropdown-caret"></span>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem onClick={() => history.push("/login")}>
                          {t("login")}
                        </DropdownItem>
                        <DropdownItem onClick={() => history.push("/register")}>
                          {t("signUp")}
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  )}
                  {/* white list */}
                  <NavItem>
                    <NavLink
                      tag={ActiveLink}
                      to="/dashboard/wishlist"
                      activeClassName="active"
                    >
                      <i className="fa fa-heart" aria-hidden="true"></i>
                    </NavLink>
                  </NavItem>
                </Nav>
              </Navbar>
            </Col>
          </Row>
        </Container>

        {/* hidden cart drawer */}
        <div
          className={isCartOpen ? "mini-cart-open" : "hidden-mini-cart"}
          aria-hidden={`${isCartOpen ? false : true}`}
        >
          <div className="mini-cart">
            <Cart />
          </div>
          <div
            className={
              isCartOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
            }
            onClick={toggleCart}
          />
        </div>

        {/* hidden menu drawer */}
        <div
          className={isMenuOpen ? "mini-menu-open" : "hidden-mini-menu"}
          aria-hidden={`${isMenuOpen ? false : true}`}
        >
          <div className="mini-menu">
            <Menu />
          </div>
          <div
            className={
              isMenuOpen ? "drawer-backdrop dark-overflow" : "drawer-backdrop"
            }
            onClick={toggleMenu}
          />
        </div>

        <ChatWidget></ChatWidget>
        {/* <a
          className="whats-app"
          href="https://wa.me/+201121833830"
          target="_blank"
        >
          <i className="fa fa-whatsapp my-float"></i>
        </a> */}
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isMenuOpen: state.navigation.isMenuOpen,
    isCartOpen: state.navigation.isCartOpen,
    isBrandOpen: state.navigation.isBrandOpen,
    isCategoryOpen: state.navigation.isCategoryOpen,
    cartItems: state.cart.cartItems,
    brands: state.brand.storeBrands,
    categories: state.category.storeCategories,
    authenticated: state.authentication.authenticated,
    user: state.account.user,
    searchValue: state.navigation.searchValue,
    suggestions: state.navigation.searchSuggestions,
  };
};

export default withTranslation()(
  connect(mapStateToProps, actions)(withRouter(Navigation))
);
