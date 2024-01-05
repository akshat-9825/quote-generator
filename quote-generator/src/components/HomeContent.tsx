import { useAppDispatch } from "../hooks";
import { RandomQuote } from "./Quotes";
import { useGetTagsQuery } from "./apiSlice";
import { setForceRefetch } from "./quoteSlice";

export const HomeContent = () => {
  const dispatch = useAppDispatch();
  const { data: tags, isLoading } = useGetTagsQuery(null);

  return (
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
  );
};
