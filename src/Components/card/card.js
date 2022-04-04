import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddtocardGet, DeletetocardGet } from "../../api/product/card";
import { FetchCardData, GetAuthDetail } from "../../layout/utils";

export function CardData(prop){
    const dispatch = useDispatch();
    const auth = GetAuthDetail();
    const card = prop.cardData;
    const cardData = prop.cardData.data? prop.cardData.data:[];
    console.log(cardData)
    const cardDataL = card.data ? card.data.length:0;
    async function deleteCard(id){
        const deleteApi = await DeletetocardGet(`api/cart/${id}`,auth);
        console.log(deleteApi);
        if(deleteApi.status){
            console.log("working");
            FetchCardData(dispatch);
        }
    }
    return(
        <>
            <div className="dropdown cart-dropdown">
                                <a href="#" className="dropdown-toggle" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-display="static">
                                    <i className="icon-shopping-cart"></i>
                                    {/* { <span className="cart-count">{ prop }</span> } */}
                                    {(cardData)? 
                                        <span className="cart-count">{cardDataL}</span>
                                        : 
                                        ""
                                    }
                                    
                                    
                                </a>
                                {cardDataL<1?'':<div className="dropdown-menu dropdown-menu-right">
                                    <div className="dropdown-cart-products">
                                        {cardData?
                                            cardData.map((card)=>{ 
                                                return( 
                                                    <div className="product">
                                                        <div className="product-cart-details">
                                                            <h4 className="product-title">
                                                                <a href="#">{card.product.product_name}</a>
                                                            </h4>

                                                            <span className="cart-product-info">
                                                                <span className="cart-product-qty">{card.quantity}</span>
                                                                x ${card.product.price}
                                                            </span>
                                                        </div>

                                                        <figure className="product-image-container">
                                                            <a href="#" className="product-image">
                                                                <img src={process.env.REACT_APP_baseUrl+card.product.images.image.image} alt="product" />
                                                            </a>
                                                        </figure>
                                                        <button className="btn-remove" onClick={()=>deleteCard(card.product.id)} title="Remove Product"><i className="icon-close"></i></button>
                                                    </div>
                                                )
                                            }):''
                                        }
                                    </div>

                                    <div className="dropdown-cart-total">
                                        <span>Shipping</span>
                                        {(card.shipping)? 
                                        <span className="cart-total-price">{card.shipping }</span>
                                        : 
                                        ""
                                    }
                                        {/* <span className="cart-total-price">${prop.cardData.shipping}</span> */}
                                    </div>
                                    <div className="dropdown-cart-total">
                                        <span>Total</span>
                                        {(card.shipping)? 
                                        <span className="cart-total-price">{card.totalProductPrice }</span>
                                        : 
                                        ""
                                    }
                                        {/* <span className="cart-total-price">${prop.cardData.totalProductPrice}</span> */}
                                    </div>
                                    <div className="dropdown-cart-action">
                                        <a href="#" className="btn btn-primary">View Cart</a>
                                        <a href="#" className="btn btn-outline-primary-2"><span>Checkout</span><i className="icon-long-arrow-right"></i></a>
                                    </div>
                                </div>}
                                
                            </div>
        </>
    )
}

export function WishlistData(prop){
    const wishlistData = prop.wishlistData;
    // console.log(wishlistData);
    // const wishlistData = prop.wishlistData.data? prop.wishlistData.data:[];
    // console.log(wishlistData)
    // const wishlistDataL = wishlist.data ? wishlist.data.length:0;
    return(
        <>
            <div className="wishlist">
                <a href="#" title="Wishlist">
                    <i className="icon-heart-o"></i>
                    {/* { <span className="cart-count">{ prop }</span> } */}
                    {(wishlistData)? 
                        <span className="wishlist-count">{wishlistData.length}</span>
                        : 
                        ""
                    }
                    
                    
                </a>
                
            </div>
        </>
    )
}