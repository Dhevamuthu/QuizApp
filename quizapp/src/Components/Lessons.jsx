import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { addtocart } from "../redux/AttemptLaterslice";
import { toast } from "react-toastify";
import '../Styling/Lessons.css';

const Lessons = () => {
  const [lessons, setLessons] = useState([]);
  const cart1 = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams(); // Extract category from the URL
  console.log(category);

  // Fetch lessons from the backend based on the category
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getlesson/${category}`);
        console.log(response.data);
        setLessons(response.data);
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    };

    fetchLessons();
  }, [category]); // Re-fetch lessons whenever the category changes

  const additem = (product) => {
    dispatch(addtocart(product));
    toast.success("Item added to cart successfully", { theme: "dark", autoClose: 1000 });
  };

  const isInCart = (productId) => {
    return cart1.some((product) => product.id === productId);
  };

  const handleAttemptNow = (lessonId) => {
    navigate(`/quiz/${lessonId}`);
  };

  return (
    <div className="lesson-list-container">
      {lessons.length > 0 ? (
        lessons.map((lesson) => (
          <div key={lesson.id} className="lesson-card">
            <img src={lesson.image} alt={lesson.lessonName} className="lesson-image" />
            <div className="lesson-details">
              <h3>{lesson.lessonName}</h3>
              <div className='buttons'>
                <button className="attempt-button" onClick={() => handleAttemptNow(lesson.id)}>Attempt Now</button>
                {!isInCart(lesson.id) ? (
                  <button className="attempt-button" onClick={() => additem(lesson)}>
                    Add to Attempt Later
                  </button>
                ) : (
                  <Link to="/attemptlater">
                    <button className="attempt-button">Go to Attempt Later</button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No lessons found for this category.</h1>
      )}
    </div>
  );
};

export default Lessons;
