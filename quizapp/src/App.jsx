import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Quiz from './Components/Quiz';
import Header from './Components/Header';
import Login from './Components/Login';
import Register from './Components/Register';
import Lessons from './Components/Lessons';
import AttemptLater from './Components/AttemptLater';
import { ToastContainer } from "react-toastify";
import Profile from './Components/Profile';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/lessons/:category' element={<Lessons/>}/>
        <Route path="/quiz/:lessonId" element={<Quiz />} />
        <Route path='/attemptlater' element={<AttemptLater/>}/>
        <Route path="/profile" element={<Profile />} />
        {/* Add other routes similarly */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
