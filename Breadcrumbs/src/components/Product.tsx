import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};
const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductType>();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data): void => {
        setProduct(data);
      });
  }, [id]);

  return (
    <div>
      {product ? (
        <div>
          <h3>{product.title}</h3>
        </div>
      ) : (
        <span>Loading...</span>
      )}
    </div>
  );
};

export default Product;
