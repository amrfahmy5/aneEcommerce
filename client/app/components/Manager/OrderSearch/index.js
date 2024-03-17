/**
 *
 * OrderSearch
 *
 */

import React from 'react';

import SearchBar from '../../Common/SearchBar';
import { withTranslation } from "react-i18next";

const OrderSearch = props => {
  const {
    t,
    i18n
  } = props;
  return (
    <div className='mb-3'>
      <SearchBar
        name='order'
        placeholder={t("searchOrder")}
        btnText={t("search")}
        onSearch={props.onSearch}
        onBlur={props.onBlur}
        onSearchSubmit={props.onSearchSubmit}
      />
    </div>
  );
};

export default withTranslation()(OrderSearch);
