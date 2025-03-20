/* eslint-disable react/prop-types */
import { useLocation, useNavigate } from "react-router-dom";

import LoggedInSideBar from "./LoggedInSideBar";
function CategoryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { items } = location.state || {};

  if (!items || !Array.isArray(items) || items.length === 0) {
    return <div>Category not found</div>;
  }

  const handleItemClick = (item) => {
    // Use item.category if it exists, otherwise fall back to URL param or inferred category
    const category = item.category || location.pathname.split("/")[2];
    navigate(`/content/${category}/${item.id}`, { state: { item } });
  };

  // Get category from first item or URL if not present
  const category = items[0].category || location.pathname.split("/")[2];
  const title = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Items";

  return (
    <div className="flex min-h-screen gap-6 max-md:flex-col-reverse">
      {/* Sidebar */}
      <div className="w-[130px] max-md:w-full mt-3 max-md:mt-0">
        <LoggedInSideBar />
      </div>
      <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{title}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer hover:shadow-md transition-shadow rounded-lg overflow-hidden"
              onClick={() => handleItemClick(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold truncate">{item.title}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
