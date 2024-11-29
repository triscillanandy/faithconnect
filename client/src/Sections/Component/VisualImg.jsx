import Rect1 from "../Plans-Images/Rectangle-6.png";
import Rect2 from "../Plans-Images/Rectangle-7.png";
const VisualImg = () => {
  return (
    <div className="flex mt-12 absolute l-[300px]">
      <img src={Rect1} className="" alt="" />
      <img className="w-[127px] h-[70px] l-[200px]  mt-10" src={Rect2} alt="" />
    </div>
  );
};
export default VisualImg;
