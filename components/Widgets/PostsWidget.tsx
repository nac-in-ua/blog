import Link from 'next/link';
import { PostsWidget } from '../../hygraph/Panel';
import Activity from '../PostTile/Activity';

type PropsType = {
  data: PostsWidget;
};

const CategoriesWidget = ({ data }: PropsType) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-xl">{data.name}</h3>
      <ul className="space-y-1">
        {data.widgetContent.posts.map((post: any) => (
          <li key={post.id}>
            <Link href={`/post/${post.slug}`}>
              <a className="flex rounded bg-slate-200 p-1 text-sm">
                {post.title}
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesWidget;
