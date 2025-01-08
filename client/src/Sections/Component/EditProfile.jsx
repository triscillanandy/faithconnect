/* eslint-disable react/prop-types */
import { useContext } from "react";
import arrow from "./Posts-images/Arrow.png";
import userImg from "./Posts-images/userImg.png";
import { MyContext } from "../../GlobalVariables";
import { useNavigate } from "react-router-dom";
import Decoration from "./Decoration";
const EditProfile = () => {
  //   const [userName, setUserName] = "Jane Cooper";
  //     const [userHandle, setUserHandle] = "jane_cooper_123";
  //     const [pronouns, setPronouns] = use

  // const [userName, setUserName] = useState("Jane Cooper");
  // const [userHandle, setUserHandle] = useState("jane_cooper_123");
  // const [pronouns, setPronouns] = useState("He");
  // const [bio, setBio] = useState("All will be well in his name");
  const navigate = useNavigate();
  const {
    userName,
    setUserName,
    userHandle,
    setUserHandle,
    pronouns,
    setPronouns,
    bio,
    setBio,
  } = useContext(MyContext);
  return (
    <div className="bg-gray-200 h-[900px]">
      <div className="flex justify-center mb-4 gap-10  items-center ">
        <img src={arrow} onClick={() => navigate("/user-profile")} />
        <h2 className="text-2xl">Edit Profile</h2>
      </div>
      <div className="flex flex-col items-center">
        <div className="bg-white w-[800px] max-[1044px]:w-[600px] h-[697px] max-[860px]:w-[500px] rounded-[50px] max-[664px]:w-3/4 max-[566px]:w-3/5 max-[540px]:w-[350px] max-[460px]:w-[300px] max-[42px]:w-3/5">
          <div className="flex gap-14 mt-16 items-center  ml-20 font-bold text-xl">
            <img src={userImg} />
            <p>Edit Picture</p>
          </div>
          <div className="mt-4">
            <UserProfile
              initialState={userName}
              setterState={setUserName}
              detailsToEdit={"Name"}
            />
            <UserProfile
              initialState={userHandle}
              setterState={setUserHandle}
              detailsToEdit={"User Handle"}
            />
            <UserProfile
              initialState={pronouns}
              setterState={setPronouns}
              detailsToEdit={"Pronouns"}
            />
            <UserProfile
              initialState={bio}
              setterState={setBio}
              detailsToEdit={"Bio"}
            />
            <button className="ml-4" onClick={() => navigate("/denomination")}>
              Add Denomination
            </button>
          </div>
        </div>
      </div>
      <Decoration />
    </div>
  );
};
export default EditProfile;

function UserProfile({ initialState, setterState, detailsToEdit }) {
  return (
    <div className="mb-16">
      <div className="flex justify-between px-8 max-[664px]:px-4 max-[588px]:px-2 items-center">
        <label>{detailsToEdit}</label>
        <input
          type="text"
          className="border-solid max-[588px]:px-1 border-[2px] rounded-lg border-gray-500 max-[638px]:px-3 px-5 py-1 mb-2 max-[560px]:w-[150px]"
          value={initialState}
          onChange={(e) => setterState(e.target.value)}
          autoFocus
        />
      </div>
      <hr className="bg-mainTheme h-2" />
    </div>
  );
}
