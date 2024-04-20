import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddPlan from './components/add.jsx'; // Import your Member component
import UpdatePlan from './components/update.jsx'; // Import your Member component
import Member from './components/member.jsx'; // Import your About component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Member />} /> {/* Home route */}
        <Route path="/plan" element={<AddPlan />} /> {/* Add Member route */}
        <Route path="/editplan/:memberId" element={<UpdatePlan />} /> {/* Corrected route for editing members */}
        {/* Add more routes for other pages here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
