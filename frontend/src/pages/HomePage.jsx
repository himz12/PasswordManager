import React from 'react';
import Manager from '../components/Manager';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Manager />
      <Footer />
    </div>
  );
};

export default HomePage;
