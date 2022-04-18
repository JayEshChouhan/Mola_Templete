import { runGetApi, runPostApi } from "../api";
import { SetAccessToken, SetRefreshToken } from "../base";

export async function LoginApi(data) {
    const result = await runPostApi("api/token/", data);
    let AuthStr = result.data.access;
    let refresh = result.data.refresh;
    console.log(AuthStr);
    if(result.statusCode===200){
        SetAccessToken(AuthStr)
        SetRefreshToken(refresh)
    }
    return result;
}

export async function LoginUserApi(auth) {
    const res = await runGetApi("api/user/", {} , auth);
    return res;
}


export async function SinginApi(data) {
    const result = await runPostApi("api/user/", data);
    let AuthStr = result.data.access;
    console.log(result.data.access);
    localStorage.setItem("AccessToken", AuthStr);
    return result;
}