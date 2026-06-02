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
        console.error("Error al obtener productos:", error);
      });
  }, []);

  return (
    <div>
      <h1>Lista de productos</h1>

      {products.map((product) => (
        <div key={product.resourceId}>
          <p>- {product.name}: {product.price} $</p>
        </div>
      ))}
    </div>
  );
}