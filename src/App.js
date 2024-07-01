import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
import LoginSignupPage from "./components/loginSignup";

function App() {
  return (
    <div>
      <Router>
        {/* <TopBar /> */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/*" element={<NotFoundPage />} />
          <Route path="/loginsignup" element={<LoginSignupPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
