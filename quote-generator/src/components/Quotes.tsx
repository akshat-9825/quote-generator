import { memo, useCallback, useEffect } from "react";
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

export const RandomQuote = memo(() => {
  const dispatch = useAppDispatch();
  const currId = useAppSelector(selectCurrentId);
  const currAuthor = useAppSelector(selectCurrentAuthor);
  const currQuote = useAppSelector(selectCurrentQuote);
  const forceRefetch = useAppSelector(selectForceRefetch);
  const tags = useAppSelector(selectCurrentTags);
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
      const { _id: id, content, author } = data;
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
    bookMarkedQuotes.push(data);
    localStorage.setItem("bookmarkedQuotes", JSON.stringify(bookMarkedQuotes));
    dispatch(setNewBookmarkQuotes(data));
  }, [currAuthor, currId, currQuote, dispatch]);

  const setDataInLocalStorage = useCallback((data: QuoteType) => {
    const { _id: id, content, author } = data;
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
    <QuoteCard
      isError={isError}
      isLoading={isLoading}
      author={currAuthor}
      quote={currQuote}
      bookmarkQuote={bookmarkQuote}
      isBookmarkVisible
    />
  );
});
