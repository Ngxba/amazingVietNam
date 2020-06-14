import React, { useRef, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
// import ReactGA from 'react-ga';

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";

// Views
import Home from "./views/Home";
import Login from "./views/login";
import Register from "./views/register";
import Places from "./views/Places";
import Blog from "./views/testblog/Blog";
import AOS from "aos";
import UserContextProvider from "./UserContext";

// // Initialize Google Analytics
// ReactGA.initialize(process.env.REACT_APP_GA_CODE);

// const trackPage = page => {
//   ReactGA.set({ page });
//   ReactGA.pageview(page);
// };

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });

    // const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    // trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <UserContextProvider>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            <AppRoute exact path="/signin" component={Login} />
            <AppRoute exact path="/register" component={Register} />
            <AppRoute
              exact
              path="/places"
              component={Places}
              layout={LayoutDefault}
            />
            <AppRoute
              exact
              path="/blog"
              component={Blog}
              layout={LayoutDefault}
            />
          </UserContextProvider>
        </Switch>
      )}
    />
  );
};

export default App;
