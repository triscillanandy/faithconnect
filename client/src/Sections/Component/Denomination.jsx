import { useState } from "react";
import Pray from "../Plans-Images/Pray.png";
import Decoration from "./Decoration";

const Denomination = () => {
  const [denomination, setDenomination] = useState("");
  return (
    <>
      <div className="flex flex-col justify-center items-center h-80">
        <div className="flex items-center gap-4 mb-8">
          <img src={Pray} className="w-[51px] " alt="" />
          <p>
            Faith<span className="text-mainTheme">Connect</span>{" "}
          </p>
        </div>

        <select
          name=""
          id=""
          className="w-[300px] rounded-[12px] h-[73.09px] max-[313px]:w-3/4 bg-mainTheme text-white"
          value={denomination}
          onChange={(e) => setDenomination(e.target.value)}
        >
          <option value="" className="mt-4">
            Select an option
          </option>
          <option value="Catholic">Catholic</option>
          <option value="Pentecostal">Pentecostal</option>
          <option value="Anglican">Anglican</option>
          <option value="Seventh Day Adventist">Seventh Day Adventist</option>
          <option value="Baptist">Baptist</option>
          <option value="Methodist">Methodist</option>
          <option value="Other">Other</option>
        </select>
        {/* <p>You selected : {denomination}</p> */}
        {denomination && <p className="mt-9">You Selected: {denomination}</p>}
      </div>
      <Decoration />
    </>
  );
};
export default Denomination;
