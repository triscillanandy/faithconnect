import frame1 from "./Profile-Images/Frame1.png";
import frame2 from "./Profile-Images/Frame2.png";
import frame3 from "./Profile-Images/Frame3.png";
import frame4 from "./Profile-Images/Frame4.png";
import frame5 from "./Profile-Images/Frame5.png";
import frame6 from "./Profile-Images/Frame6.png";
import frame7 from "./Profile-Images/Frame7.png";
import frame8 from "./Profile-Images/Frame8.png";
import frame9 from "./Profile-Images/Frame9.png";
import frame10 from "./Profile-Images/Frame10.png";
import frame11 from "./Profile-Images/Frame11.png";
import frame12 from "./Profile-Images/Frame12.png";
function UserProfileComponent() {
  return (
    <div className=" grid grid-cols-4 mt-4 max-[823px]:grid-cols-[1fr_1fr_1fr] gap-x-4 gap-y-3 max-[418px]:grid-cols-2">
      <img src={frame1} alt="" />
      <img src={frame2} alt="" />
      <img src={frame3} alt="" />
      <img src={frame4} alt="" />
      <img src={frame5} alt="" />
      <img src={frame6} alt="" />
      <img src={frame7} alt="" />
      <img src={frame8} alt="" />
      <img src={frame9} alt="" />
      <img src={frame10} alt="" />
      <img src={frame11} alt="" />
      <img src={frame12} alt="" />
    </div>
  );
}

export default UserProfileComponent;
