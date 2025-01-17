import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../Styling/Home.css';

const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get');
        setCategories(response.data);
        console.log(response.data);
        setFilteredCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    const filtered = categories.filter(category =>
      category.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredCategories(filtered);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="home-container">
      <main className="main-content">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button className="search" onClick={handleSearch}>Search</button>
        </div>
        {filteredCategories.length === 0 ? (
          <h1>Oops☹️☹️Search category not found!!</h1>
        ) : (
          <div className="categories">
            {filteredCategories.map((category) => (
              <div key={category.cid} className="category-box">
                <Link to={`/lessons/${category.name}`}>
                  <img src={category.image} alt={category.name} className="category-image" />
                  <div className="category-name">{category.name}</div>
                  <div className="expandbtn-container">
                    <Link to={`/lessons/${category.name}`} className="expandbtn">Expand</Link>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>
      <footer className="footer">
        <div className="footer-content">
        <h3>Contact Us</h3>
          <p><b>Email</b>: support@lessonsapp.com    <b>Phone</b>: +1 234 567 890  <b>Address</b>: 123 Lesson Street, Knowledge City, Learnland</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
