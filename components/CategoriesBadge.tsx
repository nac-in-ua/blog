import { ICategory } from '../@types/generated/contentful';

type PropsType = {
  categories: ICategory[];
};

const CategoriesBadge = ({ categories }: PropsType) => {
  return (
    <>
      {categories.map((category) => (
        <div
          className="flex rounded-full bg-purple-200 justify-center mx-1 text-sm px-2"
          key={category.fields.name}
        >
          {category.fields.name}
        </div>
      ))}
    </>
  );
};

export default CategoriesBadge;
