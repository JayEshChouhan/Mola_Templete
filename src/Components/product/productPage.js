import React from "react";
import Mybreadcrumb from "../breadcrumb";
import Products from "./products";

function ProductPage(prop) {
  return (
    <div className='page-wrapper'>
        <Mybreadcrumb />
        <Products grid="col-lg-4"/>
    </div>
  );
}

export default ProductPage;