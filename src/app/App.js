import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from '../Components/home';
import Login from '../Components/login';
import Myaccount from '../Components/my_account';
import ProductDetail from '../Components/product/ProductDetail';
import ProductPage from '../Components/product/productPage';
import { Provider } from 'react-redux';
import Store from '../redux/store';
import Header from '../Components/header';
import Footer from '../Components/footer';
// import axios from 'axios';
function App(props) {
  return (
    <Provider store={Store}>
      <Router>
        <Header headerTheam="header" />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<Home />} />
          <Route exact path="/products" element={<ProductPage />}/>
          <Route exact path="/products/:productId" element={<ProductDetail />}/>
          <Route exact path="/pages" element={<Home />} />
          <Route exact path="/blog" element={<Home />} />
          <Route exact path="/elements" element={<Home />} />
          <Route path="/my_account" element={ <Myaccount/>} />
          <Route path="/login" element={ <Login />} />
        </Routes>
        <Footer />
      </Router>
    </Provider>
  );
}

export default App;