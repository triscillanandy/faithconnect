/* eslint-disable react/prop-types */
import { useState } from "react";
import LoggedInSideBar from "./LoggedInSideBar";

const Search = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="flex gap-6 max-[833px]:flex-col-reverse">
      <div className="w-[130px] max-[833px]:w-full mt-3 max-[833px]:mt-0">
        <LoggedInSideBar />
      </div>
      <div className="hidden max-[833px]:flex max-[833px]:justify-between h-[500px] px-3">
        <p>Recent</p>
        <p>See all</p>
      </div>
      <div className="hidden max-[833px]:flex items-center px-4 gap-2 overflow-auto border-none">
        {/* <p>People</p> */}
        <FilterComponent text={"People"} />
        <FilterComponent text={"Devotionals"} />
        <FilterComponent text={"Sermon"} />
        <FilterComponent text={"Reels"} />
        <FilterComponent text={"Sound"} />
        <FilterComponent text={"Places"} />
      </div>

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
    </div>
  );
};
export default Search;
function FilterComponent({ text }) {
  return (
    <p className="border border-[#ff6132] rounded-[20px]  hover:bg-[#ff6132] hover:text-white cursor-pointer px-6  py-2">
      {text}
    </p>
  );
}
