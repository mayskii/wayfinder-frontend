import AttractionList from './AttractionList';
import RouteControls from './RouteControls';
import RoutePreview from './RoutePreview';

const Sidebar = ({ attractions }) => {
    return (
    <aside className='sidebar'>
        <AttractionList attractions={attractions}/>
        <RoutePreview />
        <RouteControls />
    </aside>
    );
}

export default Sidebar