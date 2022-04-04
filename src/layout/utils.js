import { GetAccessToken, GetRefreshToken } from "../api/base";
import { AddtocardGet } from "../api/product/card";
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