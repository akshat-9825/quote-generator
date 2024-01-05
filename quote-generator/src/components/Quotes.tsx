import { memo, useCallback, useEffect, useState } from "react";
import { useGetRandomQuoteQuery } from "./apiSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  selectCurrentAuthor,
  selectCurrentId,
  selectCurrentQuote,
  selectCurrentTags,
  selectForceRefetch,
  setAuthor,
  setForceRefetch,
  setId,
  setQuote,
  setNewBookmarkQuotes,
} from "./quoteSlice";
import { QuoteType } from "./types";
import { QuoteCard } from "./QuoteCard";
import classNames from "classnames";

export const RandomQuote = memo(() => {
  const dispatch = useAppDispatch();
  const currId = useAppSelector(selectCurrentId);
  const currAuthor = useAppSelector(selectCurrentAuthor);
  const currQuote = useAppSelector(selectCurrentQuote);
  const forceRefetch = useAppSelector(selectForceRefetch);
  const tags = useAppSelector(selectCurrentTags);
  const [showBookmarkToast, setShowBookmarkToast] = useState(false);
  const { data, isLoading, isError, refetch } = useGetRandomQuoteQuery(
    { tags: tags },
    {
      refetchOnFocus: false,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
    }
  );

  useEffect(() => {
    if (forceRefetch) {
      refetch();
    }
  }, [dispatch, forceRefetch, refetch]);

  const setDataInStore = useCallback(
    (data: QuoteType) => {
      const {
        _id: id,
        content,
        author,
      } = data || {
        _id: "",
        content: "",
        author: "",
      };
      dispatch(setId(id));
      dispatch(setQuote(content));
      dispatch(setAuthor(author));
    },
    [dispatch]
  );

  const bookmarkQuote = useCallback(() => {
    const data = {
      _id: currId,
      content: currQuote,
      author: currAuthor,
    };
    const bookMarkedQuotes = localStorage.bookmarkedQuotes
      ? JSON.parse(localStorage.bookmarkedQuotes)
      : [];

    const isQuoteExists = bookMarkedQuotes.some(
      (quote: QuoteType) => quote._id === currId
    );
    if (isQuoteExists) {
      return;
    }
    setShowBookmarkToast(true);
    setTimeout(() => {
      setShowBookmarkToast(false);
    }, 2000);
    bookMarkedQuotes.push(data);
    localStorage.setItem("bookmarkedQuotes", JSON.stringify(bookMarkedQuotes));
    dispatch(setNewBookmarkQuotes(data));
  }, [currAuthor, currId, currQuote, dispatch]);

  const setDataInLocalStorage = useCallback((data: QuoteType) => {
    const {
      _id: id,
      content,
      author,
    } = data || {
      _id: "",
      content: "",
      author: "",
    };
    localStorage.setItem("currId", String(id));
    localStorage.setItem("currContent", content);
    localStorage.setItem("currAuthor", author);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("currId") && !forceRefetch) {
      const data = {
        _id: String(localStorage.getItem("currId")),
        content: String(localStorage.getItem("currContent")),
        author: String(localStorage.getItem("currAuthor")),
      };
      setDataInStore(data);
    } else {
      if (data || forceRefetch) {
        if (data) {
          setDataInLocalStorage(data[0]);
          setDataInStore(data[0]);
        }
        return () => {
          dispatch(setForceRefetch(false));
        };
      }
    }
  }, [
    currId,
    data,
    dispatch,
    forceRefetch,
    setDataInLocalStorage,
    setDataInStore,
  ]);

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <QuoteCard
        isError={isError}
        isLoading={isLoading}
        author={currAuthor}
        quote={currQuote}
        bookmarkQuote={bookmarkQuote}
        isBookmarkVisible
      />
      {showBookmarkToast ? (
        <div
          className={classNames("toast absolute toast-top toast-center", {
            ["animate-fade"]: showBookmarkToast,
          })}>
          <div className="alert alert-success">
            <span>Bookmarked successfully.</span>
          </div>
        </div>
      ) : null}
    </div>
  );
});
