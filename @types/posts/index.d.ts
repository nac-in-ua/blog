import { ElementNode } from '@graphcms/rich-text-types';

interface IKeyword {
  id: number;
  name: string;
}

interface ICoverImage {
  url: string;
  alt: string;
  height: number;
  width: number;
  mimeType: string;
  fileName: string;
}

interface ICategoryData {
  id: number;
  name: string;
  slug: string;
}

interface KeywordData {
  name: string;
  id: number;
}

interface IPostData {
  id: string;
  title: string;
  content: {
    raw: {
      children: ElementNode[];
    };
  };
  coverImage: ICoverImage;
  slug: string;
  shortDescription: string;
  category: ICategoryData;
  keywords: KeywordData[];
  createdAt: string;
  publishedDateTime: string;
}

interface IDataType {
  posts: IPostData[];
  categories: ICategoryData[];
}

export type { IDataType, IPostData, ICategoryData, KeywordData, ICoverImage };
