const RouteControls = ({ createRoute, saveRoute, user, showSignInModal }) => {

    const handleSaveRoute = () => {
    if (!user) {
        showSignInModal();
        return;
    }
    saveRoute();
    } 

    return (
    <div className='route-controls'>
        <h4>Route Controls</h4>
        <button onClick={createRoute}>Create Route</button>
        <button>Optimize Route</button>
        <button onClick={handleSaveRoute}>Save Route</button>
    </div>

    );
}

export default RouteControls