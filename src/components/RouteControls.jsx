const RouteControls = ({ optimizeRoute, saveRoute, user, showSignInModal }) => {

const handleOptimize = () => {
    if (!user) {
        showSignInModal();
    return;
    }
    
    optimizeRoute();
};

const handleSaveRoute = () => {
    if (!user) {
        showSignInModal();
    return;
    }
    
    saveRoute();
};

    return (
    <div className='route-controls'>
        <h4>Route Controls</h4>

        <button onClick={handleOptimize}>
            Optimize Route
        </button>

        <button onClick={handleSaveRoute}>
            Save Route
        </button>
    </div>

    );
}

export default RouteControls