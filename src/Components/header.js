import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,NavLink } from "react-router-dom";
import { GetAccessToken, LogOutAction } from '../api/base';
import { LoginUserApi } from '../api/login/login';
import { AddtocardGet } from '../api/product/card';
import { FetchCardData, FetchWishlistData, GetAuthDetail } from '../layout/utils';
import Log from "../logo.png"
import {CardData, WishlistData } from './card/card';
export default function Header(prop){
    const userAthantication = GetAuthDetail();
	const dispatch = useDispatch();
    const userData = useSelector(state => state.Reducer2.data);
    const cardData = useSelector(card => card.CartReducer.cardData);
    const wishlistData = useSelector(wishlist => wishlist.WishlistReducer.wishlistData);
    // const [cardData , setCardData] = useState({});
    console.log(wishlistData);
    useEffect(async ()=>{
        const access = GetAccessToken();
        if(access){
            console.log(cardData);
            const user = await LoginUserApi(userAthantication);
        }
    })
    useEffect(async () => {
        await FetchCardData(dispatch);
        await FetchWishlistData(dispatch);
    }, []);
    return(
        <header className={prop.headerTheam}>
            <div className="header-top">
                <div className="header-left">
                    <div className="header-dropdown">
                        <a href="#">Usd</a>
                        <div className="header-menu">
                            <ul>
                                <li><a href="#">Eur</a></li>
                                <li><a href="#">Usd</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="header-dropdown">
                        <a href="#">Eng</a>
                        <div className="header-menu">
                            <ul>
                                <li><a href="#">English</a></li>
                                <li><a href="#">French</a></li>
                                <li><a href="#">Spanish</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <ul className="top-menu">
                        <li>
                            <a href="#">Links</a>
                            <ul>
                                <li><a href="tel:#"><i className="icon-phone"></i>Call: +0123 456 789</a></li>
                                <li><a href="#">About Us</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <li>
                                    {!userAthantication ? (
                                        <Link to="/login"><i className="icon-user"></i>Login</Link>
                                        ):(
                                        <div className="header-dropdown">
                                            <a href="#">Hi.. {userData.name}</a>
                                            <div className="header-menu">
                                                <ul>
                                                    <li><Link to="/my_account">My Account</Link></li>
                                                    <li><a href='/' onClick={()=>LogOutAction()}>Logout</a></li>
                                                </ul>
                                            </div>
                                            </div>
                                        )}
                                    </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="header-middle sticky-header">
                <div className="header-left">
                    <button className="mobile-menu-toggler">
                        <span className="sr-only">Toggle mobile menu</span>
                        <i className="icon-bars"></i>
                    </button>
                    <NavLink exact to="/" className="logo">
                        <img src={Log} alt="Molla Logo" width="110" height="25"></img>
                    </NavLink>
                </div>

                <div className="header-center">
                    <nav className="main-nav">
                        <ul className="menu sf-arrows">
                            <li>
                                <NavLink exact activeClassName="active" to="/">Home</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" to="/shop">Shop</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" to="/products">Product</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" to="/pages">Pages</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" to="/blog">Blog</NavLink>
                            </li>
                            <li>
                                <NavLink activeClassName="active" to="/elements">Elements</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="header-right">
                    <div className="header-search">
                        <a href="#" className="search-toggle" role="button" title="Search"><i className="icon-search"></i></a>
                        <form action="#" method="get">
                            <div className="header-search-wrapper">
                                <label for="q" className="sr-only">Search</label>
                                <input type="search" className="form-control" name="q" id="q" placeholder="Search in..." required />
                            </div>
                        </form>
                    </div>
                    {!userAthantication ? (
                        ""
                    ):(
                        <>
                            <WishlistData wishlistData={wishlistData}/>
                            {cardData?<CardData cardData={cardData}/>:""}
                            
                        </>
                    )}
                </div>
                </div>
        </header>
    );
}