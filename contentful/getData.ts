import { createClient, Entry } from 'contentful';
import { IPostFields, ICategoryFields } from '../@types/generated/contentful';
import { DataType, PostData, categoryData } from '../@types/posts';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

const getPostData = (post: Entry<IPostFields>): PostData => {
  const { fields } = post;
  return {
    title: fields.title,
    body: fields.body,
    poster: fields.poster,
    slug: fields.slug,
    shortDescription: fields.shortDescription,
    categories: fields.categories,
    keywords: fields.keywords,
    createdAt: post.sys.createdAt,
  };
};

const getCategoryData = (category: Entry<ICategoryFields>): categoryData => {
  return category.fields.name;
};

const getData = async (): Promise<DataType> => {
  const postEntries = await client.getEntries<IPostFields>({
    content_type: 'post',
  });

  const categoryEntries = await client.getEntries<ICategoryFields>({
    content_type: 'category',
  });

  return {
    posts: postEntries.items.map(getPostData),
    categories: categoryEntries.items.map(getCategoryData),
  };
};

export { getData };
