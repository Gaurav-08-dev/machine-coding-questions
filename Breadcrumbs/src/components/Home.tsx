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
const Home = () => {
  const [trendingProductList, setTrendingProductList] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data): void => {
        const sliceProductList = data.products.slice(0, 6);
        console.log(sliceProductList);
        setTrendingProductList(sliceProductList);
      });
  }, []);

  return (
    <div>
      <span>Trending Products</span>
      <div className="product-grid">
        {trendingProductList.map((item: Brand) => {
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
      <Link to="/products">
        <button type="button" style={{ width: "100%", padding: 10 }}>
          View all
        </button>
      </Link>
    </div>
  );
};

export default Home;
