import AttractionList from './AttractionList';
import RouteControls from './RouteControls';
import RoutePreview from './RoutePreview';

const Sidebar = () => {
    return (
    <aside className="sidebar">
        <AttractionList />
        <RoutePreview />
        <RouteControls />
    </aside>
    );
}

export default Sidebar