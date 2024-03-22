import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
type Brand = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
};
const Products = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data): void => {
        setProductList(data.products);
      });
  }, []);

  return (
    <div>
      <div className="product-grid">
        {!productList.length && <span>Loading...</span>}
        {productList.map((item: Brand) => {
          return (
            <div className="product-card" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img src={item.thumbnail} alt={item.title} />
                <span>{item.title}</span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
