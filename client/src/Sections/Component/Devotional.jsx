import LoggedInSideBar from "./LoggedInSideBar";
import devotionalImage from "./Devotional-Images/devotional-image.png";
import commentIcon from "./Devotional-Images/comment.png";
import likeIcon from "./Devotional-Images/Favorite.png";

const Devotional = () => {
  return (
    <div className="flex gap-4 md:gap-60">
      <LoggedInSideBar />
      <div className="mt-4 w-full max-w-2xl mx-auto">
        <h1 className="text-center font-bold text-2xl mb-4">Devotional</h1>
        <img src={devotionalImage} alt="Devotional" className="w-full h-auto rounded-lg" />
        <p className="font-semibold text-3xl mb-4 mt-6">
          Transformation by the Holy Spirit
        </p>
        <div className="flex items-center gap-4 mb-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            Start Prayer Plan
          </button>
          <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400">
            Save for Later
          </button>
          <div className="ml-auto">
            <p className="text-sm">
              LifeSpring Church <br /> @lifespring
            </p>
          </div>
          <p className="text-sm text-blue-500">Following</p>
        </div>
        <div className="mb-6">
          <p className="text-lg">
            Discover the power of prayer. This plan is life-changing.
          </p>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <button className="flex items-center gap-2">
            <img src={likeIcon} alt="Like" className="w-6 h-6" />
            <span>Like</span>
          </button>
          <button className="flex items-center gap-2">
            <img src={commentIcon} alt="Comment" className="w-6 h-6" />
            <span>Add Comment</span>
          </button>
        </div>
        <div className="mb-6">
          <h2 className="font-bold text-xl mb-4">Comments</h2>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm">This plan is life-changing.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Devotional;