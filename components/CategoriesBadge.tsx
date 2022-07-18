import { ICategory } from '../@types/generated/contentful';

type PropsType = {
  categories: ICategory[];
};

const CategoriesBadge = ({ categories }: PropsType) => {
  return (
    <>
      {categories.map((category) => (
        <div
          className="flex mr-2 text-sm text-gray-500 cursor-pointer"
          key={category.fields.name}
        >
          {category.fields.name}
        </div>
      ))}
    </>
  );
};

export default CategoriesBadge;
