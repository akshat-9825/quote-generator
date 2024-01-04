import { memo } from "react";
import { useGetRandomQuoteQuery } from "./apiSlice";

export const RandomQuote = memo(() => {
  const { data, isLoading, isError } = useGetRandomQuoteQuery(
    {},
    {
      refetchOnFocus: false,
    }
  );

  return (
    <div className="flex flex-col text-center p-3 w-3/4 card-background pt-7 pb-7 border-custom h-64 justify-between">
      <div className="text-3xl">
        <div className="text-3xl">
          {isLoading && <p>Loading...</p>}
          {isError && <p>Error Occurred</p>}
          {data && <p>{data.content}</p>}
        </div>
      </div>
      <div className="flex flex-row justify-center text-xl relative">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error Occurred</p>}
        {data && <p>{`-${data.author}`}</p>}
        <button className="absolute self-center right-1/4">
          <img src="/bookmark.svg" />
        </button>
      </div>
    </div>
  );
});
