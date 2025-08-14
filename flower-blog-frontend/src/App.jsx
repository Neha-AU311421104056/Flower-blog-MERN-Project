App. jsx 


import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import BlogForm from './components/BlogForm';


// Home component defined here inside the same file
function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <center>
     
  <h1>Welcome to the Flower Blog</h1>
  <p>Your daily dose of flower facts, care tips, and beautiful floral inspiration.</p>


  <h2>Latest Posts</h2>
  <ul>
    <li><strong>Rose Care Tips:</strong> How to keep your roses blooming all season.</li>
    <li><strong>Top 5 Spring Flowers:</strong> Discover colorful flowers perfect for your garden.</li>
    <li><strong>Flower Arrangement Ideas:</strong> Simple ways to brighten up your home.</li>
  </ul>


  <h2>Featured Flower of the Month</h2>
  <p><strong>Sunflower</strong> — Known for its bright yellow petals and cheerful presence, sunflowers are a symbol of happiness and loyalty.</p>
</center>
    </div>
  );
}


// About component defined here inside the same file
function About() {
  return (
   
    <div style={{ padding: '20px' }}>
      <center>
      <h1>About This App</h1>
      <p>About Flower Blog


Flower Blog is a community-driven website dedicated to sharing knowledge and passion for flowers. Whether you're a seasoned gardener or just starting out, we provide tips, guides, and inspiration to help you grow and enjoy beautiful flowers.


Our Mission


To spread the joy of flowers by offering accessible, fun, and useful content that encourages people to connect with nature.


Contact Us


Email: contact@flowerblog.com


</p>
</center>
    </div>
  );
}


// Blog component defined here inside the same file

function Blog() {
  return (
    <div style={{ padding: '20px' }}>
      
      <BlogForm />
    </div>
  );
}





// Main App component uses Router and shows NavBar + route components
function App() {
  return (

    <Router>
      <nav style={{ backgroundColor: '#eee', padding: '10px' }}>
        <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
        <Link to="/blog" style={{ marginRight: '15px' }}>Blog</Link>
        <Link to="/about">About</Link>
      </nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
    
  );
}


export default App;