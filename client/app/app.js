/**
 *
 * app.js
 *
 */

import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import store, { history } from "./store";
import { SocketProvider } from "./contexts/Socket";
import { SET_AUTH } from "./containers/Authentication/constants";
import Application from "./containers/Application";
import ScrollToTop from "./scrollToTop";
import setToken from "./utils/token";

// Import application sass styles
import "./styles/style.scss";

// Import Font Awesome Icons Set
import "font-awesome/css/font-awesome.min.css";

// Import Simple Line Icons Set
import "simple-line-icons/css/simple-line-icons.css";

// react-bootstrap-table2 styles
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

// rc-slider style
import "rc-slider/assets/index.css";


//multible lang
// import { I18nextProvider, initReactI18next } from "react-i18next";

// import global_ar from "./translations/ar/global.json";
// import global_en from "./translations/en/global.json";
// import "i18next";
// import { I18nextProvider ,initReactI18next } from "react-i18next";
// import i18next from "i18next";
// i18next.use(initReactI18next)
// .init({
//   resources: {
//     en: {  translation:global_en },
//     ar: {  translation: global_ar },
//   },
//   lng: "en",
//   fallbackLng : "en",
//   interpolation: { escapeValue: false },
// });

import { I18nextProvider } from "react-i18next";

import i18n from "./i18n"












// Authentication
const token = localStorage.getItem("token");

if (token) {
  // authenticate api authorization
  setToken(token);

  // authenticate routes
  store.dispatch({ type: SET_AUTH });
}

const app = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SocketProvider>
        <ScrollToTop>
          <I18nextProvider i18n={i18n}> {/* multi lang */}
            <Application />
          </I18nextProvider>
        </ScrollToTop>
      </SocketProvider>
    </ConnectedRouter>
  </Provider>
);

export default app;
