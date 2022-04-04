import { runDeleteApi, runGetApi, runPostApi } from "../api";

export async function Addtocard(data,auth){
    const result = await runPostApi("api/cart/", data,auth);
    return result;
}
export async function AddtocardGet(auth){
    const result = await runGetApi("api/cart/",{},auth);
    return result;
}
export async function Puttocard(data,auth){
    const result = await runPostApi("api/cart/", data,auth);
    return result;
}
export async function DeletetocardGet(url, auth){
    const result = await runDeleteApi(url,{},auth);
    console.log(result);
    return result;
}