import AttractionList from './AttractionList';
import RouteControls from './RouteControls';
import RoutePreview from './RoutePreview';

const Sidebar = ({ attractions, selectedAttractions, setSelectedAttractions, createRoute, saveRoute, user,  showSignInModal, loading}) => {
    return (
    <aside className='sidebar'>
        <AttractionList 
            attractions={attractions}
            selectedAttractions={selectedAttractions}
            setSelectedAttractions={setSelectedAttractions}
            loading={loading}
        />
        <RoutePreview selectedAttractions={selectedAttractions}/>
        <RouteControls  
            createRoute={createRoute}
            saveRoute={saveRoute}
            user={user}
            showSignInModal={showSignInModal}
            />
    </aside>
    );
}

export default Sidebar