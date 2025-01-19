import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Plans from "./Sections/Plans";
import IndividualPlan from "./Sections/IndividualPlan";
import GroupPlan from "./Sections/Component/GroupPlan";
import Login from "./Sections/Component/Login";
import ForgotPassword from "./Sections/Component/ForgotPassword";
import ResetPassword from "./Sections/Component/ResetPassword";
import Validation from "./Sections/Component/Validation";
import SucessfulVerification from "./Sections/Component/SucessfulVerification";
import EmailInstruction from "./Sections/Component/EmailInstruction";
import LoggedInUserScreen from "./Sections/Component/LoggedInUserScreen";
import UserProfile from "./Sections/Component/UserProfile";
import "./App.css";
import Search from "./Sections/Component/Search";
import Devotional from "./Sections/Component/Devotional";
import LandingPage1 from "./Sections/LandingPage1";
import Posts from "./Sections/Component/Posts";
import EditProfile from "./Sections/Component/EditProfile";
import Chat from "./Sections/Component/Chat";
import Reels from "./Sections/Component/Reels"; // Import the Reels component
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage1 />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/individual-registration" element={<IndividualPlan />} />
          <Route path="/group-registration" element={<GroupPlan />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
          <Route path="/email-verification" element={<Validation />} />
          <Route path="/verified" element={<SucessfulVerification />} />
          <Route path="/home" element={<LoggedInUserScreen />} />
          <Route path="/email-popup" element={<EmailInstruction />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/search" element={<Search />} />
          <Route path="/devotional" element={<Devotional />} />
          <Route path="/post" element={<Posts />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/chats" element={<Chat/>} />
          <Route path="/reels" element={<Reels />} /> {/* Add the route for Reels */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
