/* eslint-disable react/prop-types */
import { useState } from "react";
import LoggedInSideBar from "./LoggedInSideBar";

const Search = () => {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("devotionals"); // Track active filter

  // Dummy data for devotionals, prayers, and sermons
  const data = {
    devotionals: [
      {
        id: 1,
        title: "Daily Devotional",
        description: "Start your day with God's word.",
        image: "https://tse1.mm.bing.net/th?id=OIP.SG9k3SykipyTNSfTtsTsWwHaEo&rs=1&pid=ImgDetMain",
      },
      {
        id: 2,
        title: "Faith Boost",
        description: "Strengthen your faith with this devotional.",
        image: "https://tse1.mm.bing.net/th?id=OIP.SG9k3SykipyTNSfTtsTsWwHaEo&rs=1&pid=ImgDetMain",
      },
      {
        id: 3,
        title: "Hope for Today",
        description: "Find hope in every situation.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
      {
        id: 4,
        title: "Grace Abounds",
        description: "Experience God's grace daily.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
      {
        id: 5,
        title: "Peace in Chaos",
        description: "Find peace amidst chaos.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
    ],
    prayers: [
      {
        id: 1,
        title: "Morning Prayer",
        description: "A prayer to start your day.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
      {
        id: 2,
        title: "Healing Prayer",
        description: "Prayer for physical and emotional healing.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
      {
        id: 3,
        title: "Prayer for Peace",
        description: "Prayer for inner peace.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
      {
        id: 4,
        title: "Prayer for Strength",
        description: "Prayer for strength in tough times.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
      {
        id: 5,
        title: "Prayer for Guidance",
        description: "Prayer for divine guidance.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
    ],
    sermons: [
      {
        id: 1,
        title: "The Power of Faith",
        description: "A sermon on living by faith.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
      {
        id: 2,
        title: "Love Your Neighbor",
        description: "A sermon on the importance of love.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
      {
        id: 3,
        title: "Forgiveness",
        description: "A sermon on the power of forgiveness.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
      {
        id: 4,
        title: "Hope in Christ",
        description: "A sermon on finding hope in Christ.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
      {
        id: 5,
        title: "Living with Purpose",
        description: "A sermon on living a purposeful life.",
        image: "https://www.lca.org.au/wp-content/uploads/2020/07/daily-devotions.jpg",
      },
    ],
  };

  return (
    <div className="flex gap-6 max-[833px]:flex-col-reverse">
      {/* Sidebar */}
      <div className="w-[130px] max-[833px]:w-full mt-3 max-[833px]:mt-0">
        <LoggedInSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Search Bar */}
        <form className="mt-4 ml-4">
          <input
            type="text"
            className="w-[680px] h-[74px] rounded-[30px] border border-[#edebeb] bg-[#ededeb] placeholder:ml-7 max-[833px]:w-3/4 max-[833px]:px-4"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="ml-3">Cancel</button>
        </form>

        {/* Horizontal Filter Bar */}
        <div className="flex items-center px-4 gap-2 overflow-auto mt-6">
          <FilterComponent
            text="#faith"
            isActive={activeFilter === "faith"}
            onClick={() => setActiveFilter("faith")}
          />
          <FilterComponent
            text="#love"
            isActive={activeFilter === "love"}
            onClick={() => setActiveFilter("love")}
          />
          <FilterComponent
            text="#health"
            isActive={activeFilter === "health"}
            onClick={() => setActiveFilter("health")}
          />
          <FilterComponent
            text="#devotionals"
            isActive={activeFilter === "devotionals"}
            onClick={() => setActiveFilter("devotionals")}
          />
          <FilterComponent
            text="#prayers"
            isActive={activeFilter === "prayers"}
            onClick={() => setActiveFilter("prayers")}
          />
          <FilterComponent
            text="#sermons"
            isActive={activeFilter === "sermons"}
            onClick={() => setActiveFilter("sermons")}
          />
        </div>

        {/* Top Devotionals Section */}
        <Section title="Top Devotionals" items={data.devotionals} />

        {/* Top Prayers Section */}
        <Section title="Top Prayers" items={data.prayers} />

        {/* Top Sermons Section */}
        <Section title="Top Sermons" items={data.sermons} />
      </div>
    </div>
  );
};

export default Search;

// Section Component
function Section({ title, items }) {
  return (
    <div className="mt-8 px-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <button className="text-[#ff6132] font-semibold">See All</button>
      </div>
      <div className="flex gap-4 overflow-x-auto">
        {items.slice(0, 5).map((item) => (
          <div key={item.id} className="flex-shrink-0 w-48">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-32 rounded-lg object-cover"
            />
            <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Filter Component
function FilterComponent({ text, isActive, onClick }) {
  return (
    <button
      className={`border rounded-[20px] px-6 py-2 cursor-pointer transition-colors ${
        isActive
          ? "bg-[#ff6132] text-white"
          : "border-[#ff6132] hover:bg-[#ff6132] hover:text-white"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}