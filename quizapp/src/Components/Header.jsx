import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import '../Styling/Header.css';

const Header = () => {
    const cart1 = useSelector((state) => state.cart.cart);
    return (
        <header className="header">
            <img src="/Images/Logo.png" alt="QuizChamp Logo" className="logo" />
            <div className="header-text">Welcome to QuizChamp!</div>
            <nav className="nav">
                <Link to="/">Home</Link>
                <Link to="/attemptlater">Attempt Later: {cart1.length}</Link>
                <Link to="/liked-quiz">Liked Quiz</Link>
                <Link to="/profile">Profile</Link>
            </nav>
        </header>
    );
}

export default Header;
