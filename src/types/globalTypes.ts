interface IAuthor {
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
  createdAt: string;
  updatedAt: string;
  author: IAuthor;
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
