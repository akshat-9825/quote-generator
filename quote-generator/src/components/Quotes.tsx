import { memo, useCallback, useEffect } from "react";
import { useGetRandomQuoteQuery } from "./apiSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  selectCurrentAuthor,
  selectCurrentId,
  selectCurrentQuote,
  selectCurrentTags,
  setAuthor,
  setId,
  setQuote,
} from "./quoteSlice";
import { QuoteType } from "./types";

export const RandomQuote = memo(() => {
  const dispatch = useAppDispatch();
  const currId = useAppSelector(selectCurrentId);
  const currAuthor = useAppSelector(selectCurrentAuthor);
  const currQuote = useAppSelector(selectCurrentQuote);
  const tags = useAppSelector(selectCurrentTags);
  const { data, isLoading, isError } = useGetRandomQuoteQuery(
    { tags: tags, toCall: true },
    {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
    }
  );

  const setDataInStore = useCallback(
    (data: QuoteType) => {
      const { _id: id, content, author } = data;
      dispatch(setId(id));
      dispatch(setQuote(content));
      dispatch(setAuthor(author));
    },
    [dispatch]
  );

  const setDataInLocalStorage = useCallback((data: QuoteType) => {
    const { _id: id, content, author } = data;
    localStorage.setItem("currId", String(id));
    localStorage.setItem("currContent", content);
    localStorage.setItem("currAuthor", author);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("currId")) {
      const data = {
        _id: String(localStorage.getItem("currId")),
        content: String(localStorage.getItem("currContent")),
        author: String(localStorage.getItem("currAuthor")),
      };
      setDataInStore(data);
    } else if (data) {
      setDataInLocalStorage(data[0]);
      setDataInStore(data[0]);
    }
  }, [currId, data, dispatch, setDataInLocalStorage, setDataInStore]);

  return (
    <div className="flex flex-col text-center p-3 w-3/4 card-background pt-7 pb-7 border-custom h-64 justify-between">
      <div className="text-3xl">
        <div className="text-3xl">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error Occurred</p>}
          {data && <p>{currQuote}</p>}
        </div>
      </div>
      <div className="flex flex-row justify-center text-xl relative">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error Occurred</p>}
        {data && <p>{`-${currAuthor}`}</p>}
        <button className="absolute self-center right-1/4">
          <img src="/bookmark.svg" />
        </button>
      </div>
    </div>
  );
});
