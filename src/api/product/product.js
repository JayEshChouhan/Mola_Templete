import { runGetApi } from "../api";

export async function ProductGetApi() {
  const result = await runGetApi("api/products/", {});
  return result;
}
export async function ProductSingleGetApi(url) {
  const result = await runGetApi(url, {});
  return result;
}