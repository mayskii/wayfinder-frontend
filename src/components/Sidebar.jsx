import AttractionList from './AttractionList';
import RouteControls from './RouteControls';
import RoutePreview from './RoutePreview';

const Sidebar = ({ attractions, selectedAttractions, setSelectedAttractions, createRoute }) => {
    return (
    <aside className='sidebar'>
        <AttractionList 
            attractions={attractions}
            selectedAttractions={selectedAttractions}
            setSelectedAttractions={setSelectedAttractions}
        />
        <RoutePreview selectedAttractions={selectedAttractions}/>
        <RouteControls  createRoute={createRoute}/>
    </aside>
    );
}

export default Sidebar