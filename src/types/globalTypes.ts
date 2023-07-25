export interface IAuthor {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBook {
  _id: string;
  title: string;
  description: string;
  image: string;
  publicationYear: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
  author: IAuthor;
}
export interface IBookForReadingList {
  _id: string;
  title: string;
  description: string;
  image: string;
  publicationYear: string;
  genre: string;
  createdAt: string;
  updatedAt: string;
  author: IAuthor;
  isFinished: boolean;
}

export interface IReadingList {
  _id: string;
  book: IBookForReadingList;
  user: IAuthor;
  isFinished: boolean;
}
export interface IWishlist {
  _id: string;
  book: IBook;
  user: IAuthor;
}

interface IMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IApiResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  meta?: IMeta;
  data?: T;
}

export interface IErrorMessages {
  path: string;
  message: string;
}

export interface ICustomError {
  status: number;
  data: {
    success: boolean;
    message: string;
    errorMessages: IErrorMessages[];
  };
}
