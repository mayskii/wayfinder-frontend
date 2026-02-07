import PropTypes from 'prop-types';
import AttractionList from './AttractionList';
import RouteControls from './RouteControls';
import SavedRoutes from './SavedRoutes';

const Sidebar = ({
    attractions,
    selectedAttractions,
    setSelectedAttractions,
    optimizeRoute,
    saveRoute,
    user,
    showSignInModal,
    loading,
    routes,
    setRoutes,
    loadRoute,
    deleteRoute,
    currentPage,
    setCurrentPage,
    navigate
}) => {
    return (
    <div className="sidebar">

        <AttractionList 
            attractions={attractions}
            selectedAttractions={selectedAttractions}
            setSelectedAttractions={setSelectedAttractions}
            loading={loading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
        
        <RouteControls  
            optimizeRoute={optimizeRoute}
            saveRoute={saveRoute}
            user={user}
            showSignInModal={showSignInModal}
        />


        {user && (
        <SavedRoutes
            routes={routes}
            setRoutes={setRoutes}
            loadRoute={loadRoute}
            deleteRoute={deleteRoute}
            isAuthenticated={user !== null}
            navigate={navigate}
        />
        )}
    </div>
    );
};

Sidebar.propTypes = {
    attractions: PropTypes.array.isRequired,
    selectedAttractions: PropTypes.array.isRequired,
    setSelectedAttractions: PropTypes.func.isRequired,
    optimizeRoute: PropTypes.func.isRequired,
    saveRoute: PropTypes.func.isRequired,
    user: PropTypes.object,
    showSignInModal: PropTypes.func,
    loading: PropTypes.bool,
    routes: PropTypes.array.isRequired,
    loadRoute: PropTypes.func.isRequired,
    deleteRoute: PropTypes.func.isRequired,
    setRoutes: PropTypes.func.isRequired,
};

export default Sidebar;