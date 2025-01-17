// AttemptLater.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeitem } from '../redux/AttemptLaterslice';
import '../Styling/AttemptLater.css';

const AttemptLater = () => {
  const cart1 = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleRemoveItem = (id) => {
    dispatch(removeitem(id));
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCart = cart1.filter((product) =>
    product.lessonName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ marginLeft: "5%", marginTop: "10%" }} className="Allcart">
      <h1 style={{ backgroundColor: "#f4f4f4", padding: "10px", textAlign: "center" }}>
        Lessons for Attempt Later
      </h1>
      <input
        type="text"
        placeholder="Search lessons..."
        value={searchTerm}
        onChange={handleSearch}
        style={{ margin: "10px auto", display: "block", padding: "10px", width: "80%" }}
      />
      {filteredCart.length === 0 ? (
        <h2 style={{ textAlign: "center", marginTop: "20px" }}>Nothing to Attempt Later</h2>
      ) : (
        filteredCart.map((product) => (
          <div className="cart-card" key={product.id}>
            <img className="cart-image" src={product.image} alt={product.lessonName} />
            <div className="lesson-details">
              <h3 className="product-title">{product.lessonName}</h3>
              <p className="product-category">Category: {product.category}</p>
              <div className="buttons">
                <button className="primary-btn" onClick={() => handleRemoveItem(product.lid)}>
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AttemptLater;
