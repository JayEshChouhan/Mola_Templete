import React ,{useEffect , useState} from "react";
import axios from "axios";
import {useLocation, useParams} from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import { ProductSingleGetApi } from "../../api/product/product";
import { Addtocard } from "../../api/product/card";
import { TailSpin } from  'react-loader-spinner'
import Mybreadcrumb from "../breadcrumb";
import Img from "../../layout/img";
const base_url = 'http://127.0.0.1:8000';

function ProductDetail(prop) {
    let productId = useParams();
    const [productsDetail , setProductsDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () =>{
          setLoading(true);
          try {
              console.log(productId.productId);
            const ProductDetailmain = await ProductSingleGetApi(`api/products/${productId.productId}`);
            console.log(ProductDetailmain);
            let id = ProductDetailmain.data;
            setProductsDetail(id)
          } catch (error) {
            console.error(error.message);
          }
          setLoading(false);
        }
        fetchData();
    },[]);
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
        <div className="page-wrapper">
            <Mybreadcrumb />
            {loading && <div className="d-flex flex-wrap justify-content-center"><TailSpin color="#00BFFF" height={80} width={80}/><p className="w-100 text-center mt-2">Loading Products....</p></div>}
            {!loading && (
                <>
                    <div className="bg-light pb-5 mb-4">
                        <Container>
                            <Row>
                                {productsDetail.images.images.map(image => 
                                    <>
                                        <Col lg={4}>
                                            <img src={base_url+image.image} alt="product image" />
                                        </Col>
                                    </>
                                )}
                            </Row>
                            {/* <OwlCarousel className='product-gallery-carousel owl-full owl-nav-dark owl-simple' dots={false} loop items={3} margin={0} nav>
                                <div class='item '>
                                    <figure class="product-gallery-image">
                                        <img src={base_url+productsDetail.photo_url} alt="product image" />
                                    </figure>
                                </div>
                                <div class='item '>
                                    <figure class="product-gallery-image">
                                        <img src={base_url+productsDetail.photo_url} alt="product image" />
                                    </figure>
                                </div>
                                <div class='item '>
                                    <figure class="product-gallery-image">
                                        <img src={base_url+productsDetail.photo_url} alt="product image" />
                                    </figure>
                                </div>
                                <div class='item '>
                                    <figure class="product-gallery-image">
                                        <img src={base_url+productsDetail.photo_url} alt="product image" />
                                    </figure>
                                </div>
                            </OwlCarousel> */}
                        </Container>
                    </div>
                    <div className="product-details product-details-centered product-details-separator">
                        <Container>
                            <Row>
                                <Col md={6}>
                                    <h1 className="product-title">{productsDetail.product_name}</h1>
                                    <div className="ratings-container">
                                        <div className="ratings">
                                            <div className="ratings-val" style={{width: "80%"}}></div>
                                        </div>
                                        <a className="ratings-text" href="#product-review-link" id="review-link">( 2 Reviews )</a>
                                    </div>
                                    <div className="product-price">${productsDetail.price}</div>
                                    <div className="product-content">
                                        <p>{productsDetail.description}</p>
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <div className="product-details-action">
                                        <div className="details-action-col">
                                            <div className="product-details-quantity">
                                                <input type="number" min="1" max="10" step="1" />
                                            </div>
                                            <a 
                                                href="javascript:;" 
                                                className="btn-product btn-cart"
                                                onClick={(event)=> 
                                                    {
                                                      return(
                                                        AddToCard(productsDetail.id)
                                                      )
                                                    }
                                                }
                                                >
                                                <span>add to cart</span>
                                            </a>
                                        </div>
                                        <div className="details-action-wrapper">
                                            <a href="#" className="btn-product btn-wishlist" title="Wishlist"><span>Add to Wishlist</span></a>
                                            {/* <a href="#" className="btn-product btn-compare" title="Compare"><span>Add to Compare</span></a> */}
                                        </div>
                                    </div>
                                    <div className="product-details-footer details-footer-col">
                                        <div className="product-cat">
                                            <span>Category:</span>
                                            <a href="#">Women</a>,
                                            <a href="#">Dresses</a>,
                                            <a href="#">Yellow</a>
                                        </div>

                                        <div className="social-icons social-icons-sm">
                                            <span className="social-label">Share:</span>
                                            <a href="#" className="social-icon" title="Facebook" target="_blank"><i class="icon-facebook-f"></i></a>
                                            <a href="#" className="social-icon" title="Twitter" target="_blank"><i class="icon-twitter"></i></a>
                                            <a href="#" className="social-icon" title="Instagram" target="_blank"><i class="icon-instagram"></i></a>
                                            <a href="#" className="social-icon" title="Pinterest" target="_blank"><i class="icon-pinterest"></i></a>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </>
            )}
               <section className="logos">
          <div class="container">
            <div class="heading">
              <p class="heading-cat">trending brands</p>
            </div>
          </div>
          <Container>
            <Row>
              <Col lg={2}>
                <a href="#" class="brand">
                    <Img src="images/1.png" alt="Brand Name"/>
                </a>
              </Col>
              <Col lg={2}>
                <a href="#" class="brand">
                    <Img src="images/2.png" alt="Brand Name"/>
                </a>
              </Col>
              <Col lg={2}>
                <a href="#" class="brand">
                    <Img src="images/3.png" alt="Brand Name"/>
                </a>
              </Col>
              <Col lg={2}>
                <a href="#" class="brand">
                  <Img src="images/4.png" alt="Brand Name" />
                </a>
              </Col>
              <Col lg={2}>
                <a href="#" class="brand">
                  <Img src="images/5.png" alt="Brand Name" />
                </a>
              </Col>
              <Col lg={2}>
                <a href="#" class="brand">
                  <Img src="images/6.png" alt="Brand Name" />
                </a>
              </Col>
            </Row>
          </Container>
        </section>
        </div>
    )
}

export default ProductDetail