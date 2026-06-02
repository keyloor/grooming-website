import { useEffect, useState } from "react";
import type { Product } from "../models/Product";
import { getProducts } from "../services/ProductService";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h1>Product list</h1>

      {products.map((product) => (
        <div key={product.resourceId}>
          <p>- {product.name}: {product.price} $</p>
        </div>
      ))}
    </div>
  );
}