import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { TailSpin } from 'react-loader-spinner'
import { ProductGetApi } from "../../api/product/product";
import { Addtocard } from "../../api/product/card";
const baseUrl = 'http://127.0.0.1:8000';
// import productsData from "./productsData";

export default function Products(prop) {
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cardID, setcardID] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const ProductDetailmain = await ProductGetApi();
        if (ProductDetailmain.statusCode == 200) {
          setProductsData(ProductDetailmain.data.results)
        }
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }
    fetchData();
  }, []);
  const AddToCard = async (id) => {
    const cardData = {
      "product": id
    }
    
    try {
      const cardApi = await Addtocard(cardData,true);
      console.log(cardApi);
    } catch (error) {
      console.error(error.message);
    }
  }
  return (
    <div className="row">
      {loading && <div className="d-flex flex-wrap justify-content-center"><TailSpin color="#00BFFF" height={80} width={80} /><p className="w-100 text-center mt-2">Loading Products....</p></div>}
      {!loading && (
        productsData.map(product => {
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
                          return(
                            AddToCard(product.id)
                          )
                        }
                      }
                      >
                        <span>add to cart</span>
                    </a>
                    <a href="javascript:;" className="btn-product-icon btn-wishlist"><span>Add to Wishlist</span></a>
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