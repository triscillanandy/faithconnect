// import Registration from "./Sections/Component/Registration";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Plans from "./Sections/Plans";
import IndividualPlan from "./Sections/IndividualPlan";
import GroupPlan from "./Sections/Component/GroupPlan";
import Login from "./Sections/Component/Login";
import ForgotPassword from "./Sections/Component/ForgotPassword";
import ResetPassword from "./Sections/Component/ResetPassword";
import LandingPage from "./Sections/LandingPage";
import Validation from "./Sections/Component/Validation";
import SucessfulVerification from "./Sections/Component/SucessfulVerification";
import EmailInstruction from "./Sections/Component/EmailInstruction";
import LoggedInUserScreen from "./Sections/Component/LoggedInUserScreen";

// import Plans from "../../Sections/Plans.jsx";
// import Plans from "./Sections/Plans";
// import './App.css'

function App() {
  return (
    <>
      {/* <Plans /> */}
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>} />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
