export interface QuoteType {
  _id: string;
  content: string;
  author: string;
}

export interface TagType {
  dateAdded: string;
  dateModified: string;
  name: string;
  quoteCount: number;
  slug: string;
  _id: string;
}

export interface RandomQuoteParam {
  tags: string[];
  toCall: boolean;
}
