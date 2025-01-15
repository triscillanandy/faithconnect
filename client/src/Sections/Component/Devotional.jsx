import LoggedInSideBar from "./LoggedInSideBar";
import devotionalImage from "./Devotional-Images/devotional-image.png";
import comment from "./Devotional-Images/comment.png";
import like from "./Devotional-Images/Favorite.png";

const Devotional = () => {
  return (
    <div className="flex gap-60">
      <LoggedInSideBar />
      <div className="mt-4">
        <h1 className="text-center font-bold text-2xl mb-4">Devotional</h1>
        <img src={devotionalImage} alt="" />
        <p className="font-[600] text-3xl mb-4">
          Transformation by the Holy Spirit
        </p>
        <div className="flex items-center gap-4">
          <button className="">Start Prayer Plan</button>
          <button>Save for Later</button>
          <div>
            <p>
              LifeSpring Church <br /> @lifespring
            </p>
            {/* <p>@lifespring</p> */}
          </div>
          <p>Following</p>
        </div>
      </div>
    </div>
  );
};
export default Devotional;
