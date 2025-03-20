// ContentDetail.jsx
import { useLocation } from "react-router-dom";
import LoggedInSideBar from "./LoggedInSideBar";

function ContentDetail() {
  const location = useLocation();
  const { item } = location.state || {};

  if (!item) return <div>Content not found</div>;

  return (
    <div className="flex min-h-screen gap-6 max-md:flex-col-reverse">
      {/* Sidebar */}
      <div className="w-[130px] max-md:w-full mt-3 max-md:mt-0">
        <LoggedInSideBar />
      </div>

    <div className="p-4 max-w-2xl mx-auto">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-cover rounded-lg mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
      <p className="text-gray-600">{item.description}</p>
      <div className="prose prose-lg text-gray-800 whitespace-pre-wrap">
        {item.content}
      </div>
    </div>
    </div>
  );
}

export default ContentDetail;