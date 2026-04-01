import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth setUser={setUser} />} />
        <Route path="/feed" element={user ? <Feed /> : <Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;