// src/components/ProductList.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import "./productlist.css";

// const initialProducts = array;

function ProductList() {
  const [products, setProducts] = useState([]);

  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("price");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const gelAllProduct = async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      setProducts(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    gelAllProduct();
  });
  // Filter products by category
  const filteredProducts = products.filter((product) => {
    return filterCategory === "All" || product.category === filterCategory;
  });

  // Sort products
  filteredProducts.sort((a, b) => {
    if (sortBy === "price") {
      return a.price - b.price;
    } else if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  // Calculate pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Pagination function
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="product_list_container">
      {/* Filter and sort controls */}

      <div className="product_list_header">
        <h2>Product List</h2>
        <div className="product_list_header_filter">
          <p>Sort by</p>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="All">All Categories</option>
            <option value="jewelery">Jewelery</option>
            <option value="women's clothing">Women's clothing</option>
            <option value="men's clothing">Men's clothing</option>
            <option value="electronics">Electronics</option>

            {/* Add more categories as needed */}
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="price">Sort by Price</option>
            <option value="title">Sort by Title</option>
          </select>
        </div>
      </div>

      {/* Product List */}
      <div className="product_list">
        {currentProducts.map((product) => (
          // <div key={product.id}>
          //   <img src={product.image} alt={product.title} />
          //   <h2>{product.title}</h2>
          //   {/* <p>{product.description}</p> */}
          //   <p>Price: ${product.price}</p>
          //   <p>Category: {product.category}</p>
          // </div>
          <ProductCard
            key={product.id}
            category={product.category}
            title={product.title}
            price={product.price}
            img={product.image}
            description={product.description}
            rate={product.rating.rate}
            count={product.rating.count}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="productlist_pagination">
        {filteredProducts.length > productsPerPage && (
          <div className="productlist_pagination_button">
            {Array.from(
              { length: Math.ceil(filteredProducts.length / productsPerPage) },
              (_, index) => (
                <button
                  className={`pagination_button ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                  key={index + 1}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
