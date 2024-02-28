/*
 *
 * WishList
 *
 */

import React from 'react';

import { connect } from 'react-redux';

import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import WishList from '../../components/Manager/WishList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { withTranslation } from "react-i18next";

class Wishlist extends React.PureComponent {
  componentDidMount() {
    this.props.fetchWishlist();
  }

  render() {
    const { wishlist, isLoading, updateWishlist ,t,i18n} = this.props;

    const displayWishlist = wishlist.length > 0;

    return (
      <div className='wishlist-dashboard'>
        <SubPage title={t("washList")} isMenuOpen={null}>
          {isLoading && <LoadingIndicator />}
          {displayWishlist && (
            <WishList wishlist={wishlist} updateWishlist={updateWishlist} i18n={i18n}/>
          )}
          {!isLoading && !displayWishlist && (
            <NotFound message={t("washListNoItem")} />
          )}
        </SubPage>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    wishlist: state.wishlist.wishlist,
    isLoading: state.wishlist.isLoading
  };
};

export default withTranslation()(connect(mapStateToProps, actions)(Wishlist));
