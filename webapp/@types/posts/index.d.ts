type PostData = {
  title: string;
  body: any;
  poster: any;
  slug: string;
  shortDescription: string;
  categories: any[];
  keywords: any[];
  createdAt: string;
};

type categoryData = string;

type DataType = {
  posts: PostData[];
  categories: categoryData[];
};

export type { DataType, PostData, categoryData };
