import React from "react";
import ReactStars from "react-rating-stars-component";
import "./productcard.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ProductCard = ({
  category,
  title,
  price,
  img,
  description,
  rate,
  count,
}) => {
  return (
    <div className="product_container">
      <div className="product_container_img">
        <img src={img}></img>
      </div>
      <div className="product_container_description">
        <h2>{title.slice(0, 30)}</h2>

        <div className="product_container_description_rating">
          <ReactStars size={30} value={rate} edit={false} />({count})
        </div>
        <p>${price}</p>
      </div>

      <button>
        <ShoppingCartIcon />
        Add to cart
      </button>
    </div>
  );
};

export default ProductCard;
