import { runGetApi } from "../api";

export async function ProductGetApi() {
  const result = await runGetApi("api/products/", {});
  return result;
}