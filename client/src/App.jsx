import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";

// Lazy-load components for better performance
const Plans = lazy(() => import("./Sections/Plans"));
const IndividualPlan = lazy(() => import("./Sections/IndividualPlan"));
const GroupPlan = lazy(() => import("./Sections/Component/GroupPlan"));
const Login = lazy(() => import("./Sections/Component/Login"));
const ForgotPassword = lazy(() => import("./Sections/Component/ForgotPassword"));
const ResetPassword = lazy(() => import("./Sections/Component/ResetPassword"));
const Validation = lazy(() => import("./Sections/Component/Validation"));
const SucessfulVerification = lazy(() => import("./Sections/Component/SucessfulVerification"));
const EmailInstruction = lazy(() => import("./Sections/Component/EmailInstruction"));
const LoggedInUserScreen = lazy(() => import("./Sections/Component/LoggedInUserScreen"));
const UserProfile = lazy(() => import("./Sections/Component/UserProfile"));
const Search = lazy(() => import("./Sections/Component/Search"));
const Devotional = lazy(() => import("./Sections/Component/Devotional"));
const LandingPage1 = lazy(() => import("./Sections/LandingPage1"));
const Posts = lazy(() => import("./Sections/Component/Posts"));
const EditProfile = lazy(() => import("./Sections/Component/EditProfile"));
const Chats = lazy(() => import("./Sections/Component/Chats"));
const Reels = lazy(() => import("./Sections/Component/Reels"));
 // Add a 404 Not Found component

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if the user is authenticated
  return token ? children : <Navigate to="/Login" />; // Redirect to login if not authenticated
};

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage1 />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/individual-registration" element={<IndividualPlan />} />
          <Route path="/group-registration" element={<GroupPlan />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/email-verification" element={<Validation />} />
          <Route path="/verified" element={<SucessfulVerification />} />
          <Route path="/email-popup" element={<EmailInstruction />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <LoggedInUserScreen />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/devotional"
            element={
              <ProtectedRoute>
                <Devotional />
              </ProtectedRoute>
            }
          />
          <Route
            path="/post"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-profile"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chats"
            element={
              <ProtectedRoute>
                <Chats />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reels"
            element={
              <ProtectedRoute>
                <Reels />
              </ProtectedRoute>
            }
          />

          {/* 404 Not Found Route */}
       
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;