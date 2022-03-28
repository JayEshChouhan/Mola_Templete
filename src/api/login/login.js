import { runGetApi, runPostApi } from "../api";
import { SetAccessToken, SetRefreshToken } from "../base";

export async function LoginApi(data) {
    const result = await runPostApi("api/token/", data);
    let AuthStr = result.data.access;
    let refresh = result.data.refresh;
    console.log(AuthStr);
    SetAccessToken(AuthStr)
    SetRefreshToken(refresh)
    return result;
}

export async function LoginUserApi(auth) {
    const res = await runGetApi("api/user/", {} , auth);
    console.log(auth);
    const userData = JSON.stringify(res.data)
    localStorage.setItem("userData", userData);
    return res;
}


export async function SinginApi(data) {
    const result = await runPostApi("api/user/", data);
    let AuthStr = result.data.access;
    console.log(result.data.access);
    localStorage.setItem("AccessToken", AuthStr);
    return result;
}