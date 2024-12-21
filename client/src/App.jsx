// import Registration from "./Sections/Component/Registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Plans from "./Sections/Plans";
import IndividualPlan from "./Sections/IndividualPlan";
import GroupPlan from "./Sections/Component/GroupPlan";
import Login from "./Sections/Component/Login";
import ForgotPassword from "./Sections/Component/ForgotPassword";
import ResetPassword from "./Sections/Component/ResetPassword";
// import LandingPage from "./Sections/LandingPage";
import Validation from "./Sections/Component/Validation";
import SucessfulVerification from "./Sections/Component/SucessfulVerification";
import EmailInstruction from "./Sections/Component/EmailInstruction";
import LoggedInUserScreen from "./Sections/Component/LoggedInUserScreen";
import UserProfile from "./Sections/Component/UserProfile";
import "./App.css";
import Search from "./Sections/Component/Search";
import Devotional from "./Sections/Component/Devotional";
import LandingPage1 from "./Sections/LandingPage1";
// import Plans from "../../Sections/Plans.jsx";
// import Plans from "./Sections/Plans";
// import './App.css'

function App() {
  return (
    <>
      {/* <Plans /> */}
      <Router>
        <Routes>
          {/* <Route path="/" element={<LandingPage></LandingPage>} /> */}
          <Route path="/" element={<LandingPage1 />} />
          <Route path="/plans" element={<Plans></Plans>}></Route>
          <Route
            path="/individual-registration"
            element={<IndividualPlan></IndividualPlan>}
          ></Route>
          <Route path="/group-registration" element={<GroupPlan></GroupPlan>} />
          <Route path="/Login" element={<Login></Login>} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword></ForgotPassword>}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword></ResetPassword>}
          />
          <Route
            path="/email-verification"
            element={<Validation></Validation>}
          />
          <Route
            path="/verified"
            element={<SucessfulVerification></SucessfulVerification>}
          ></Route>
          <Route path="/LoggedIn" element={<LoggedInUserScreen />} />
          <Route
            path="/email-popup"
            element={<EmailInstruction></EmailInstruction>}
          />
          <Route path="/user-profile" element={<UserProfile></UserProfile>} />
          <Route path="/search" element={<Search></Search>} />
          <Route path="/devotional" element={<Devotional></Devotional>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
  // import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
  // import Navbar from './Sections/Navbar/Navbar';

  // import Plans from './Sections/Plans';
  // import IndividualPlan from './Sections/IndividualPlan';
  // import GroupPlan from './Sections/Component/GroupPlan';
  // import Login from './Sections/Component/Login';
  // import ForgotPassword from './Sections/Component/ForgotPassword';
  // import ResetPassword from './Sections/Component/ResetPassword';
  // import LandingPage from './Sections/LandingPage';
  // import Validation from './Sections/Component/Validation';
  // import SucessfulVerification from './Sections/Component/SucessfulVerification';
  // import EmailInstruction from './Sections/Component/EmailInstruction';
  // import LoggedInUserScreen from './Sections/Component/LoggedInUserScreen';

  // // Component to manage the Navbar and Routes
  // const AppContent = () => {
  //   const location = useLocation();

  //   // Define the routes where the Navbar should be hidden
  //   const hideNavbarRoutes = ['/Login','individual-registration', '/reset-password', '/forgot-password'];

  //   return (
  //     <>
  //       {/* Conditionally render the Navbar */}
  //       {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

  //       {/* Define the routes */}
  //       <Routes>
  //         <Route path="/" element={<LandingPage />} />
  //         <Route path="/plans" element={<Plans />} />
  //         <Route path="/individual-registration" element={<IndividualPlan />} />
  //         <Route path="/group-registration" element={<GroupPlan />} />
  //         <Route path="/Login" element={<Login />} />
  //         <Route path="/forgot-password" element={<ForgotPassword />} />
  //         <Route path="/reset-password" element={<ResetPassword />} />
  //         <Route path="/email-verification" element={<Validation />} />
  //         <Route path="/verified" element={<SucessfulVerification />} />
  //         <Route path="/LoggedIn" element={<LoggedInUserScreen />} />
  //         <Route path="/email-popup" element={<EmailInstruction />} />
  //       </Routes>
  //     </>
  //   );
  // };

  // // Main App Component
  // function App() {
  //   return (
  //     <Router>
  //       <AppContent />
  //     </Router>
  //   );
  // }

  // export default App;
