import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AddToWishlistApi, DeletetoWishlist } from "../../api/product/wishlist";
import { FetchWishlistData, GetAuthDetail } from "../../layout/utils";

export default function Wishlist(prop){
    const userAthantication = GetAuthDetail();
    const navigate = useNavigate();
	const dispatch = useDispatch();
    const WishlistDataList = useSelector(wishlist => wishlist.WishlistReducer.wishlistData);
    const AddToWishlist = async (id) => {
        const wishlistData = {
          "product": id,
        }
        try {
          const wishlistApi = await AddToWishlistApi(wishlistData,userAthantication);
          if(wishlistApi.statusCode===201||wishlistApi.statusCode===200){
            FetchWishlistData(dispatch);
          }
        } catch (error) {
          console.error(error.message);
        }
    }
    const DeletetoWishlistmain = async (id) => {
        try {
          const removewishlistApi = await DeletetoWishlist(id,userAthantication);
          if(removewishlistApi.statusCode===204||removewishlistApi.statusCode===200){
            FetchWishlistData(dispatch);
          }
        } catch (error) {
          console.error(error.message);
        }
    }
    return(
        <>
            {WishlistDataList.some(data => data.product === prop.id)?<a 
                                    href="javascript:;" 
                                    className="btn-product-icon btn-wishlist active"
                                    onClick={(event)=> 
                                    {
                                        if(userAthantication){
                                        DeletetoWishlistmain(prop.id)
                                        }else{
                                        navigate('/login')
                                        }
                                    }
                                    }
                                >
                                  <span>Remove to Wishlist</span>
                                </a>:<a 
                                    href="javascript:;" 
                                    className="btn-product-icon btn-wishlist"
                                    onClick={(event)=> 
                                        {
                                        if(userAthantication){
                                            AddToWishlist(prop.id)
                                        }else{
                                            navigate('/login')
                                        }
                                        }
                                    }
                                >
                                    <span>Add to Wishlist</span>
                                </a>}
        </>
    );
}