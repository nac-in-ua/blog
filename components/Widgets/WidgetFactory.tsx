import { PanelWidget, WidgetTypes } from '../../hygraph/Panel';
import CategoriesWidget from './CategoriesWidget';
import PostsWidget from './PostsWidget';

type FactoryPropsType = {
  widget: PanelWidget;
};

const WidgetFactory = ({ widget }: FactoryPropsType) => {
  switch (widget.type) {
    case WidgetTypes.Categories:
      return <CategoriesWidget data={widget} />;
    case WidgetTypes.Posts:
      return <PostsWidget data={widget} />;
    default:
      return (
        <div className="text-red-500">Error! No such widget type found....</div>
      );
  }
};

export default WidgetFactory;
