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
import SellerDashboard from "./pages/SellerDashboard";
import Checkout from "./pages/Checkout";
import AddProducts from "./pages/AddProducts";
import Login from "./pages/Login"
import AboutSection from "./components/AboutSection";
import AddReview from "./pages/AddReview";

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
          <Route path="/sellerdashboard" element={<SellerDashboard />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/addproducts" element={<AddProducts />} />
          <Route path="/loginsignup" element={<Login />} />
          <Route path="/about" element={<AboutSection />} />
          <Route path="/addreview" element={<AddReview />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;