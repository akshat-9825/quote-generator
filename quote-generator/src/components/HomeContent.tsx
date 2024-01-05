import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { RandomQuote } from "./Quotes";
import { useGetTagsQuery } from "./apiSlice";
import { setForceRefetch, setNewTag } from "./quoteSlice";

export const HomeContent = () => {
  const dispatch = useAppDispatch();
  const { data: tags, isLoading } = useGetTagsQuery(null);
  const [tagSelected, setTagSelected] = useState("");
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center">
      <RandomQuote />
      <div className="mt-24">
        <details className="dropdown" open={open}>
          <summary
            className="m-1 w-64 border-custom text-black text-xl font-normal hover:bg-white bg-white btn"
            onClick={(e) => {
              e.preventDefault();
              setOpen(!open);
            }}>
            {tagSelected}
          </summary>
          <ul className="flex flex-col flex-nowrap overflow-y-auto h-60 p-2 shadow rounded-lg menu dropdown-content text-xl z-[1] bg-white text-black w-64">
            {tags &&
              !isLoading &&
              tags.slice(0, 20).map((tag, index) => (
                <li key={index} value={tag.name}>
                  <a
                    onClick={(
                      e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                    ) => {
                      e.preventDefault();
                      setTagSelected(tag.name);
                      setOpen(false);
                      dispatch(setNewTag(tag.name));
                      dispatch(setForceRefetch(true));
                    }}>
                    {tag.name}
                  </a>
                </li>
              ))}
          </ul>
        </details>
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
