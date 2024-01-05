export const QuoteCard = ({
  author,
  quote,
  isLoading = false,
  isError = false,
  bookmarkQuote = () => {},
  isBookmarkVisible = false,
}: {
  author: string;
  quote: string;
  isLoading?: boolean;
  isError?: boolean;
  bookmarkQuote?: () => void;
  isBookmarkVisible?: boolean;
}) => {
  return (
    <div className="flex flex-col text-center p-3 w-3/4 card-background pt-7 pb-7 border-custom min-h-64 gap-12 justify-between">
      <div className="text-3xl">
        <div className="text-3xl">
          {isLoading && !quote ? <p>Loading...</p> : null}
          {isError && !quote ? <p>Error Occurred</p> : null}
          {<p>{quote.length > 0 ? quote : "No Quote Available"}</p>}
        </div>
      </div>
      <div className="flex flex-row justify-center text-xl relative">
        {isLoading && !author ? <p>Loading...</p> : null}
        {isError && !author ? <p>Error Occurred</p> : null}
        {<p>{`-${author ? author : "No Quote Available"}`}</p>}
        {isBookmarkVisible && (
          <button
            onClick={bookmarkQuote}
            className="absolute self-center right-1/4">
            <img src="/bookmark.svg" />
          </button>
        )}
      </div>
    </div>
  );
};
