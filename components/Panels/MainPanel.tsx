import { PanelWidget } from '../../hygraph/Panel';
import WidgetFactory from '../Widgets/WidgetFactory';

type PropsType = {
  widgets: PanelWidget[];
};

const MainPanel = ({ widgets = [] }: PropsType) => {
  return (
    <div className="sticky top-14">
      {widgets.map((widget: PanelWidget) => (
        <section key={widget.id} className="flex border bg-white p-2">
          <WidgetFactory widget={widget} />
        </section>
      ))}
    </div>
  );
};

export default MainPanel;
