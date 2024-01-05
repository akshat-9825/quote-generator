import { Link } from "react-router-dom";
import { RandomQuote } from "./Quotes";
import { useAppDispatch } from "../hooks";
import { useGetTagsQuery } from "./apiSlice";
import { setForceRefetch } from "./quoteSlice";

import "./Landing.css";

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const { data: tags, isLoading } = useGetTagsQuery(null);

  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-row w-full justify-between text-2xl px-16 pt-6">
        <Link to="/home">
          <div>Home</div>
        </Link>
        <Link to="/bookmarks">
          <div>Bookmarks</div>
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center">
        <RandomQuote />
        <div className="mt-24">
          <select className="w-64 h-9 bg-white text-black border-none border-custom tags">
            {tags &&
              !isLoading &&
              tags.slice(0, 15).map((tag, index) => (
                <option key={index} value={tag.name}>
                  {tag.name}
                </option>
              ))}
          </select>
        </div>
        <button
          onClick={() => {
            dispatch(setForceRefetch(true));
          }}
          className="mt-20 border-custom text-2xl w-64 text-center bg-green-600 p-1">
          Next Quote
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
