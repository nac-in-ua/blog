import Link from 'next/link';
import { CategoriesItem } from '../../hygraph/Panel';

type PropsType = {
  category: CategoriesItem;
};

const Category = ({ category }: PropsType) => {
  const { name, slug } = category;

  return (
    <Link href={`/categories/${slug}`}>
      <a
        data-category={slug}
        className="flex rounded-md bg-slate-200 px-2 text-sm text-gray-700 transition-colors duration-300 ease-in-out hover:bg-slate-300"
      >
        {name}
      </a>
    </Link>
  );
};

export default Category;
