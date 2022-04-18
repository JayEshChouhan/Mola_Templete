import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { TailSpin } from 'react-loader-spinner'
import { ProductGetApi } from "../../api/product/product";
import { Addtocard, AddtocardGet } from "../../api/product/card";
import { FetchCardData, FetchWishlistData, GetAuthDetail, GetProductsData } from "../../layout/utils";
import { useDispatch, useSelector } from "react-redux";
import { AddToWishlistApi, DeletetoWishlist } from "../../api/product/wishlist";
import Wishlist from "./wishlist";
const baseUrl = process.env.REACT_APP_baseUrl;
// import productsData from "./productsData";

export default function Products(prop) {
	const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAthantication = GetAuthDetail();
  const productsData = useSelector(productsData => productsData.ProductsReducer.productsData);
  const [loading, setLoading] = useState(true);
  const [cardLoading, setcardLoading] = useState(false);
  const cardDataList = useSelector(card => card.CartReducer.cardData);
  const WishlistDataList = useSelector(wishlist => wishlist.WishlistReducer.wishlistData);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ProductDetailmain = await GetProductsData(dispatch);
        // if (ProductDetailmain.statusCode == 200) {
        //   setProductsData(ProductDetailmain.data.results);
        //   console.log(productsData);
        // }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  const AddToCard = async (id) => {
    setcardLoading(true)
    var qyt = 1;
    console.log(cardDataList);
    cardDataList.data.map((data)=>{
      if(data.product_id == id){
        qyt = data.quantity + 1;
        // console.log(data.quantity+1);
        console.log(qyt);
      }
    })
    const cardData = {
      "product": id,
      "quantity": qyt,
    }
    try {
      const cardApi = await Addtocard(cardData,userAthantication);
      if(cardApi.statusCode===201||cardApi.statusCode===200){
        FetchCardData(dispatch);
        setcardLoading(false)
      }
    } catch (error) {
      console.error(error.message);
      setcardLoading(false)
    }
  }
  const AddToWishlist = async (id) => {
    const wishlistData = {
      "product": id,
    }
    try {
      const wishlistApi = await AddToWishlistApi(wishlistData,userAthantication);
      if(wishlistApi.statusCode===201||wishlistApi.statusCode===200){
        // FetchCardData(dispatch);
        FetchWishlistData(dispatch);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div className="row">
      {loading && <div className="d-flex flex-wrap justify-content-center"><TailSpin color="#00BFFF" height={80} width={80} /><p className="w-100 text-center mt-2">Loading Products....</p></div>}
      {!loading && (
        productsData.map((product, i) => {
          return (
            <div className={prop.grid}>
              <div key={product.id} className="product product-10 text-center">
                <figure className="product-media">
                  <Link to={`/products/${product.id}`}>
                    {product.images && (
                      <img src={`${baseUrl}${product.images.image.image}`} alt={product.images.image.product_image_key} className="product-image" />
                    )}
                  </Link>
                </figure>
                <div className="product-body">
                  <div className="product-action">
                    <a 
                      href="javascript:;" 
                      className="btn-cart" 
                      onClick={(event)=> 
                        {
                          if(userAthantication){
                            AddToCard(product.id)
                          }else{
                            navigate('/login')
                          }
                        }
                      }
                      >
                        {cardLoading? 
                          <span className="lodding">
                            <TailSpin color="#000000" height={20} width={20} />
                          </span>
                          :
                          <span>add to cart</span>
                        }
                      </a>
                    {console.log(WishlistDataList)}
                    {WishlistDataList.length>0?
                      <Wishlist id={product.id}/>:<a 
                      href="javascript:;" 
                      className="btn-product-icon btn-wishlist"
                      onClick={(event)=> 
                        {
                          if(userAthantication){
                            AddToWishlist(product.id)
                          }else{
                            navigate('/login')
                          }
                        }
                      }
                      >
                        <span>Add to Wishlist</span>
                    </a>
                    }
                  </div>
                  <div className="product-intro">
                    <h3 className="product-title">
                      <Link to={`/products/${product.id}`}>
                        {product.product_name}
                      </Link>
                    </h3>
                    <div className="product-price">${product.price}</div>
                    <p className="product-description">{product.description}</p>
                  </div>
                  <div className="product-detail">
                    <div className="ratings-container">
                      <div className="ratings">
                        <div className="ratings-val"></div>
                      </div>
                      <span className="ratings-text">( 6 Reviews )</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      )}
    </div>
  );
}