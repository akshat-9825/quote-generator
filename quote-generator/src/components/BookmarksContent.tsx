import { QuoteCard } from "./QuoteCard";

export const BookmarksContent = () => {
  const bookmarks = JSON.parse(localStorage.bookmarkedQuotes);
  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p>No Bookmarks Yet</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center gap-12 mb-10">
      {bookmarks.map(
        (
          { author, content }: { author: string; content: string },
          index: number
        ) => {
          return <QuoteCard key={index} author={author} quote={content} />;
        }
      )}
    </div>
  );
};
