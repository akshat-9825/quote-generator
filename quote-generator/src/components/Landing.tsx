import cn from "classnames";
import { Link } from "react-router-dom";
import { BookmarksContent } from "./BookmarksContent";
import { LandingProps } from "./types";
import { HomeContent } from "./HomeContent";

import "./Landing.css";

const LandingPage = ({ type }: LandingProps) => {
  return (
    <div className="flex flex-col gap-20">
      <div className="flex flex-row w-full justify-between text-2xl px-16 pt-6">
        <Link to="/home">
          <div
            className={cn({
              ["text-bold"]: type === "home",
            })}>
            Home
          </div>
        </Link>
        <Link to="/bookmarks">
          <div
            className={cn({
              ["text-bold"]: type === "bookmarks",
            })}>
            Bookmarks
          </div>
        </Link>
      </div>
      {type === "home" ? <HomeContent /> : <BookmarksContent />}
    </div>
  );
};

export default LandingPage;
