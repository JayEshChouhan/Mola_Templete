import { runDeleteApi, runGetApi, runPostApi } from "../api";

export async function AddToWishlistApi(data,auth){
    const result = await runPostApi("api/wishlist/", data,auth);
    return result;
}
export async function AddToWishlistGetApi(auth){
    const result = await runGetApi("api/wishlist/",{},auth);
    return result;
}

export async function DeletetoWishlist(url, auth){
    const result = await runDeleteApi(`api/wishlist/${url}`,{},auth);
    console.log(result);
    return result;
}