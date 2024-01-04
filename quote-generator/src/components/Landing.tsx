import { Link } from "react-router-dom";
import { RandomQuote } from "./Quotes";
import "./Landing.css";

const LandingPage = () => {
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
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>
        <button className="mt-20 border-custom text-2xl w-64 text-center bg-green-600 p-1">
          Next Quote
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
