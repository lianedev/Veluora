import { memo } from 'react';
import Navbar from "../../src/components/Navbar"
import ProductList from "../../src/components/productList"

const Page = () => {
  return (
    <div>
      <Navbar />
      <ProductList />
    </div>
  );
};

export default memo(Page);