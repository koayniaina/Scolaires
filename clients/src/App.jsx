import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute"
import NotFound from "./pages/NotFound";
// import ProtectedRoute from "./components/ProtectedRoute";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

 <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["client", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />

     <Route 
  path="/admin" 
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <Admin />
    </ProtectedRoute>
  } 
/>

      <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
