import { createClient, Entry } from 'contentful';
import { IPostFields, ICategoryFields } from '../@types/generated/contentful';
import { DataType, PostData, categoryData } from '../@types/posts';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

const getAccess = () => ({
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

  const posts = postEntries.items.map(getPostData);
  const categories = categoryEntries.items.map(getCategoryData);

  const getDataByQuery = async (query: string) => {
    const response = await fetch(
      `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query,
        }),
      }
    );
    return response.json();
  };
  const {
    data: { postCollection },
  } = await getDataByQuery(`
  {
    postCollection {
      items {
        title
        body {
          json
        }
        poster {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        slug
        shortDescription
        categoriesCollection {
          items {
            name
          }
        }
        keywords
        sys {
          publishedAt
        }
      }
    }
  }
`);

  return {
    posts,
    categories,
  };
};

export { getData };
