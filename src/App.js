import { Route, Switch, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { lazy } from "react";
import {
  TopBar,
  Home,
  Shop,
  Cart,
  Header,
  Footer,
  Contact,
  NotFoundPage,
} from "./pages/index";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";

const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));
const CreateAccount = lazy(() => import("./pages/CreateAccount"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));


function App() {
  return (
    <div>
      <Router>
        <TopBar />
        <Header />
        <AccessibleNavigationAnnouncer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */}
          <Route path="/app" component={Layout} />
          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
