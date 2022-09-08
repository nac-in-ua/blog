import { PanelWidget } from '../../hygraph/Panel';
import WidgetFactory from '../Widgets/WidgetFactory';

type PropsType = {
  widgets: PanelWidget[];
};

const MainPanel = ({ widgets = [] }: PropsType) => {
  return (
    <>
      {widgets.map((widget: PanelWidget) => (
        <section key={widget.id} className="flex border bg-white p-2">
          <WidgetFactory widget={widget} />
        </section>
      ))}
    </>
  );
};

export default MainPanel;
