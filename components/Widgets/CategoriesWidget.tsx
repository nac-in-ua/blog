import Link from 'next/link';
import { CategoriesWidget } from '../../hygraph/Panel';

type PropsType = {
  data: CategoriesWidget;
};

const CategoriesWidget = ({ data }: PropsType) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="text-xl">{data.name}</h3>
      <ul className="space-y-1">
        {data.widgetContent.categories.map((category: any) => (
          <li key={category.id}>
            <Link href={`/categories/${category.slug}`}>
              <a className="flex rounded bg-stone-200 p-1">{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesWidget;
