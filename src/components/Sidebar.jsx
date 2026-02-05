import AttractionList from './AttractionList';
import RouteControls from './RouteControls';
import RoutePreview from './RoutePreview';

const Sidebar = ({ attractions, selectedAttractions, setSelectedAttractions, optimizeRoute, saveRoute, user,  showSignInModal, loading}) => {
    return (
    <>
        <div className='sidebar'>
        <AttractionList 
            attractions={attractions}
            selectedAttractions={selectedAttractions}
            setSelectedAttractions={setSelectedAttractions}
            loading={loading}
        />
        <RouteControls  
            optimizeRoute={optimizeRoute}
            saveRoute={saveRoute}
            user={user}
            showSignInModal={showSignInModal}
            />
        </div>
        <RoutePreview selectedAttractions={selectedAttractions}/>
    </>
    );
}

export default Sidebar