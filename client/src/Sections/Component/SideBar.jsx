import Pray from "../Plans-Images/Pray.png";
import Rect1 from "../Plans-Images/Rectangle-6.png";
import Rect2 from "../Plans-Images/Rectangle-7.png";
const SideBar = () => {
  return (
    <div className="w-[537px] h-[700px]  flex flex-col justify-center items-center max-forgotPasswordScreen:hidden">
    
     <img src={Pray} alt="Pray" className="w-[200px] h-[200px]" />
      <p className="font-bold text-2xl sm:text-3xl md:text-4xl mt-10">
        Faith<span className="text-[#FF6132]">Connect</span>
      </p>
      <div className="flex absolute bottom-2 left-1">
        <img src={Rect1} className="w-[100px] h-[120px]" alt="Rect1" />
        <img src={Rect2} className="w-[100px] h-[60px] mt-14" alt="Rect2" />
      </div>
    
    </div>
  );
};
export default SideBar;
