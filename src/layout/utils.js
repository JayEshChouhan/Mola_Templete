import { useDispatch } from "react-redux";
import { GetAccessToken, GetRefreshToken } from "../api/base";
import { LoginUserApi } from "../api/login/login";
import { AddtocardGet } from "../api/product/card";
import { ProductGetApi } from "../api/product/product";
import { AddToWishlistGetApi } from "../api/product/wishlist";

const userAthantication = GetAuthDetail();

export function GetAuthDetail(){
    const token = GetAccessToken();
    const refresh = GetRefreshToken();
    if(token && refresh){
        return true;
    }else{
        return false;
    }
}
export async function GetProductsData(dispatch){
  const ProductDetailmain = await ProductGetApi();
  dispatch({type: "PRODUCTSDATA" ,payload: {productsData:ProductDetailmain.data.results}});
}
export async function GetUseData(auth,dispatch){
  const userData = await LoginUserApi(auth);
  dispatch({type: "LOGINUSERDATA" ,payload: {data:userData.data}});
}
export const FetchCardData = async (dispatch) => {
  try {
    const cardDataApi = await AddtocardGet(userAthantication);
    if (cardDataApi.statusCode == 200) {
      console.log(cardDataApi);
        // setCardData(cardDataApi.data);
        // console.log(cardData);
        dispatch({type: "CARDDATA" ,payload: {cardData:cardDataApi.data}});
    }
  } catch (error) {
    console.error(error.message);
  }
}


export const FetchWishlistData = async (dispatch) => {
  try {
    const WishlistDataApi = await AddToWishlistGetApi(userAthantication);
    if (WishlistDataApi.statusCode == 200) {
      console.log(WishlistDataApi);
        // setCardData(cardDataApi.data);
        // console.log(cardData);
        dispatch({type: "WISHLISTDATA" ,payload: {wishlistData:WishlistDataApi.data}});
    }
  } catch (error) {
    console.error(error.message);
  }
}